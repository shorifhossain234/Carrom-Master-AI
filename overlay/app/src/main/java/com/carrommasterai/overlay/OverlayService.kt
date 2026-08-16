package com.carrommasterai.overlay

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Path
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.Gravity
import android.view.View
import android.view.WindowManager

class OverlayService : Service() {

    private lateinit var windowManager: WindowManager
    private lateinit var overlayView: OverlayView

    override fun onCreate() {
        super.onCreate()

        createNotificationChannel()

        val notification = Notification.Builder(this, "carrom_overlay")
            .setContentTitle("Carrom Master AI")
            .setContentText("Training overlay is running")
            .setSmallIcon(android.R.drawable.ic_menu_compass)
            .build()

        startForeground(1001, notification)

        windowManager =
            getSystemService(WINDOW_SERVICE) as WindowManager

        overlayView = OverlayView()

        val windowType =
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            } else {
                @Suppress("DEPRECATION")
                WindowManager.LayoutParams.TYPE_PHONE
            }

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.MATCH_PARENT,
            windowType,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            PixelFormat.TRANSLUCENT
        )

        params.gravity = Gravity.TOP or Gravity.START

        windowManager.addView(overlayView, params)
    }

    override fun onDestroy() {
        super.onDestroy()

        if (::overlayView.isInitialized) {
            windowManager.removeView(overlayView)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            val channel = NotificationChannel(
                "carrom_overlay",
                "Carrom Master AI Overlay",
                NotificationManager.IMPORTANCE_LOW
            )

            val manager =
                getSystemService(NotificationManager::class.java)

            manager.createNotificationChannel(channel)
        }
    }

    inner class OverlayView : View(this@OverlayService) {

        private val purplePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.rgb(192, 132, 252)
            strokeWidth = 8f
            style = Paint.Style.STROKE
            strokeCap = Paint.Cap.ROUND
        }

        private val dottedPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.WHITE
            strokeWidth = 5f
            style = Paint.Style.STROKE
            pathEffect =
                android.graphics.DashPathEffect(
                    floatArrayOf(12f, 12f),
                    0f
                )
        }

        private val redPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.RED
            strokeWidth = 8f
            style = Paint.Style.STROKE
            strokeCap = Paint.Cap.ROUND
        }

        private val bouncePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = Color.rgb(216, 180, 254)
            style = Paint.Style.FILL
        }

        override fun onDraw(canvas: android.graphics.Canvas) {
            super.onDraw(canvas)

            val w = width.toFloat()
            val h = height.toFloat()

            /*
             * Demo positions only.
             *
             * These coordinates will later come from
             * manual calibration / real-board detection.
             */

            val strikerX = w * 0.78f
            val strikerY = h * 0.72f

            val bounce1X = w * 0.52f
            val bounce1Y = h * 0.84f

            val bounce2X = w * 0.28f
            val bounce2Y = h * 0.65f

            val bounce3X = w * 0.16f
            val bounce3Y = h * 0.35f

            val targetX = w * 0.62f
            val targetY = h * 0.28f

            /*
             * Main purple multi-bounce trajectory.
             */

            val trajectory = Path()

            trajectory.moveTo(strikerX, strikerY)

            trajectory.lineTo(
                bounce1X,
                bounce1Y
            )

            trajectory.lineTo(
                bounce2X,
                bounce2Y
            )

            trajectory.lineTo(
                bounce3X,
                bounce3Y
            )

            trajectory.lineTo(
                targetX,
                targetY
            )

            canvas.drawPath(
                trajectory,
                purplePaint
            )

            /*
             * Bounce point circles.
             */

            val bouncePoints = listOf(
                Pair(bounce1X, bounce1Y),
                Pair(bounce2X, bounce2Y),
                Pair(bounce3X, bounce3Y)
            )

            for ((x, y) in bouncePoints) {
                canvas.drawCircle(
                    x,
                    y,
                    12f,
                    bouncePaint
                )
            }

            /*
             * Dotted striker -> target aiming line.
             */

            canvas.drawLine(
                strikerX,
                strikerY,
                targetX,
                targetY,
                dottedPaint
            )

            /*
             * Red direction arrow.
             */

            val arrowStartX = targetX
            val arrowStartY = targetY

            val arrowEndX = w * 0.86f
            val arrowEndY = h * 0.30f

            canvas.drawLine(
                arrowStartX,
                arrowStartY,
                arrowEndX,
                arrowEndY,
                redPaint
            )

            canvas.drawLine(
                arrowEndX,
                arrowEndY,
                arrowEndX - 30f,
                arrowEndY - 18f,
                redPaint
            )

            canvas.drawLine(
                arrowEndX,
                arrowEndY,
                arrowEndX - 30f,
                arrowEndY + 18f,
                redPaint
            )
        }
    }
}
