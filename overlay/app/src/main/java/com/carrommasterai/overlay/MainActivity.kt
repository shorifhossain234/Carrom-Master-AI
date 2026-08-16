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

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(32, 48, 32, 32)
        }

        val title = TextView(this).apply {
            text = "Carrom Master AI"
            textSize = 26f
            setPadding(0, 0, 0, 16)
        }

        val description = TextView(this).apply {
            text = "Training overlay for real carrom practice."
            textSize = 16f
            setPadding(0, 0, 0, 32)
        }

        val overlayButton = Button(this).apply {
            text = "Allow Overlay Permission"
            setOnClickListener {
                if (!Settings.canDrawOverlays(this@MainActivity)) {
                    val intent = Intent(
                        Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:$packageName")
                    )
                    startActivity(intent)
                }
            }
        }

        val status = TextView(this).apply {
            text = if (Settings.canDrawOverlays(this@MainActivity)) {
                "Overlay permission: READY"
            } else {
                "Overlay permission: NOT GRANTED"
            }
            textSize = 14f
            setPadding(0, 24, 0, 0)
        }

        layout.addView(title)
        layout.addView(description)
        layout.addView(overlayButton)
        layout.addView(status)

        setContentView(layout)
    }
}
