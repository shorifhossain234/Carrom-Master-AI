# Carrom Master AI - Android Overlay

## Purpose

Carrom Master AI is a training and analysis overlay concept for real-world carrom practice.

The overlay is designed to display visual shot guidance above a real carrom board, including:

- Purple neon trajectory lines
- Bounce-point markers
- Dotted striker-to-target aiming line
- Red direction arrow
- Target highlighting
- Manual board calibration
- Manual striker and coin positioning

## Important Safety Boundary

This project is a training and visualization tool.

It must not:

- Automatically strike a carrom piece
- Control another carrom game
- Automatically click or tap another app
- Modify or manipulate a third-party game
- Provide automated online-game actions

All shots are performed manually by the player.

## Planned Architecture

Real Carrom Board
        ↓
Camera / Manual Calibration
        ↓
Board Position Model
        ↓
Striker + Coin + Pocket Positions
        ↓
Trajectory Calculation
        ↓
Transparent Android Overlay
        ↓
Visual Training Guidance

## Overlay Visuals

The planned overlay contains:

1. Main purple trajectory line
2. Purple bounce-point circles
3. White dotted aiming line
4. Red direction arrow
5. Target highlight
6. Pocket direction guidance

## Development Stages

### Stage 1
Create Android overlay application shell.

### Stage 2
Create transparent overlay surface.

### Stage 3
Add manual board calibration.

### Stage 4
Add striker, coin, queen and pocket position controls.

### Stage 5
Add direct trajectory calculation.

### Stage 6
Add multi-bounce reflection visualization.

### Stage 7
Test the overlay with a real physical carrom board.

## Current Web Prototype

The existing Next.js project is kept as a separate prototype for testing interaction and trajectory concepts.

The Android overlay will be developed separately from the web prototype.
