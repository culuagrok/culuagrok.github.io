// Pomodoro timer for the Waveshare ESP32-S3-Touch-LCD-1.28.
// Built on Waveshare's "ESP32-S3-Touch-LCD-1.28-Test" demo files (DEV_Config, LCD_1in28,
// GUI_Paint, CST816S ...). Put this .ino in a copy of that demo folder, next to those files.
#include <Arduino.h>
#include "LCD_Test.h"

// Shorten these while testing, like 10 seconds each
const unsigned long WORK_MS  = 25UL * 60UL * 1000UL;
const unsigned long BREAK_MS =  5UL * 60UL * 1000UL;

enum State { IDLE, WORK, BREAK };
State state = IDLE;
unsigned long phaseStart = 0;
long lastShown = -1;

UWORD *Frame;                  // 240x240 RGB565 frame buffer in PSRAM
CST816S touch(6, 7, 13, 5);    // sda, scl, rst, irq (same as the Waveshare demo)

void drawText(const char *big, const char *small) {
  Paint_Clear(BLACK);
  Paint_DrawString_EN(120 - strlen(big) * 17 / 2, 100, big, &Font24, BLACK, WHITE);       // Font24 is 17 px wide
  if (small) Paint_DrawString_EN(120 - strlen(small) * 11 / 2, 135, small, &Font16, BLACK, WHITE);  // Font16 is 11 px wide
  LCD_1IN28_Display(Frame);
}

void enter(State s) {
  state = s;
  phaseStart = millis();
  lastShown = -1;
  if (s == IDLE) drawText("Tap", "to start");
}

void setup() {
  Serial.begin(115200);
  touch.begin();
  psramInit();
  Frame = (UWORD *)ps_malloc(LCD_1IN28_HEIGHT * LCD_1IN28_WIDTH * 2);
  if (Frame == NULL) { Serial.println("No PSRAM buffer"); while (true) delay(1000); }
  DEV_Module_Init();
  LCD_1IN28_Init(HORIZONTAL);
  Paint_NewImage((UBYTE *)Frame, LCD_1IN28.WIDTH, LCD_1IN28.HEIGHT, 0, BLACK);
  Paint_SetScale(65);
  Paint_SetRotate(ROTATE_0);
  enter(IDLE);
}

void loop() {
  bool tapped = touch.available();

  if (state == IDLE) {
    if (tapped) enter(WORK);                       // a tap starts the 25-minute countdown
  } else {
    unsigned long limit = (state == WORK) ? WORK_MS : BREAK_MS;
    unsigned long elapsed = millis() - phaseStart;
    if (tapped && elapsed > 1000) {                // ignore the touch event that started this phase
      enter(IDLE);                                 // a tap while running cancels
    } else if (elapsed >= limit) {
      enter(state == WORK ? BREAK : IDLE);         // work -> break -> idle
    } else {
      long left = (limit - elapsed) / 1000;
      if (left != lastShown) {                     // redraw once per second
        lastShown = left;
        char buf[8];
        snprintf(buf, sizeof(buf), "%02ld:%02ld", left / 60, left % 60);
        drawText(buf, state == WORK ? "focus" : "break");
      }
    }
  }
  delay(20);
}
