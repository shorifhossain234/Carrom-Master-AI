package com.carrommasterai.overlay

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var statusText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        buildInterface()
    }

    override fun onResume() {
        super.onResume()

        if (::statusText.isInitialized) {
            updateOverlayStatus()
        }
    }

    private fun buildInterface() {

        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(32, 48, 32, 32)
        }

        val title = TextView(this).apply {
            text = "Carrom Master AI"
            textSize = 28f
            setPadding(0, 0, 0, 16)
        }

        val description = TextView(this).apply {
            text = "Real-screen training overlay"
            textSize = 17f
            setPadding(0, 0, 0, 28)
        }

        val permissionButton = Button(this).apply {
            text = "Allow Overlay Permission"

            setOnClickListener {

                if (!Settings.canDrawOverlays(this@MainActivity)) {

                    val intent = Intent(
                        Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:$packageName")
                    )

                    startActivity(intent)

                } else {

                    startOverlayService()
                }
            }
        }

        val startButton = Button(this).apply {
            text = "Start Carrom Overlay"

            setOnClickListener {

                if (Settings.canDrawOverlays(this@MainActivity)) {

                    startOverlayService()

                } else {

                    val intent = Intent(
                        Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:$packageName")
                    )

                    startActivity(intent)
                }
            }
        }

        val stopButton = Button(this).apply {
            text = "Stop Overlay"

            setOnClickListener {
                stopService(
                    Intent(
                        this@MainActivity,
                        OverlayService::class.java
                    )
                )

                updateOverlayStatus()
            }
        }

        statusText = TextView(this).apply {
            textSize = 16f
            setPadding(0, 28, 0, 0)
        }

        layout.addView(title)
        layout.addView(description)
        layout.addView(permissionButton)
        layout.addView(startButton)
        layout.addView(stopButton)
        layout.addView(statusText)

        setContentView(layout)

        updateOverlayStatus()
    }

    private fun startOverlayService() {

        val intent = Intent(
            this,
            OverlayService::class.java
        )

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {

            startForegroundService(intent)

        } else {

            startService(intent)
        }

        statusText.text = "Overlay status: RUNNING"
    }

    private fun updateOverlayStatus() {

        statusText.text =
            if (Settings.canDrawOverlays(this)) {
                "Overlay permission: READY"
            } else {
                "Overlay permission: NOT GRANTED"
            }
    }
}
