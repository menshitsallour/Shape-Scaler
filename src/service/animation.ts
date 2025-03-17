export class Animation {
	private scaleFactor: number = 1 // Initial scale factor
	private targetScale: number // Maximum scale factor (e.g., 4)
	private scaleStep: number // Incremental step for scaling (e.g., 0.01)
	private scalingUp: boolean = true // Flag to determine scaling direction
	private onUpdate: (scaleFactor: number) => void // Callback for updating the scale
	private onReset: () => void // Callback for resetting the shapes
	private delayFrames: number = 60 // Number of frames for delay (≈1 second at 60 FPS)
	private currentDelay: number = 0 // Counter for delay frames
	private isDelaying: boolean = false // Flag to track if delay is active

	// Constructor initializes animation parameters and callbacks
	constructor(
		targetScale: number,
		scaleStep: number,
		onUpdate: (scaleFactor: number) => void,
		onReset: () => void
	) {
		this.targetScale = targetScale // Set the target scale
		this.scaleStep = scaleStep // Set the scaling step
		this.onUpdate = onUpdate // Set the update callback
		this.onReset = onReset // Set the reset callback
	}

	// Main animation loop
	animate(): void {
		// Handle delay phase if active
		if (this.isDelaying) {
			this.handleDelay()
			return
		}

		// Handle scaling phase
		this.updateScaleFactor()
		this.onUpdate(this.scaleFactor) // Notify subscribers of the new scale factor
	}

	// Handles the delay logic
	private handleDelay(): void {
		this.currentDelay++ // Increment the delay counter
		if (this.currentDelay >= this.delayFrames) {
			this.isDelaying = false // End delay mode
			this.currentDelay = 0 // Reset delay counter
			this.onReset() // Trigger shape reset
			this.scalingUp = true // Prepare to scale up again
		}
		this.onUpdate(this.scaleFactor) // Update the view during delay
	}

	// Updates the scale factor based on the current scaling direction
	private updateScaleFactor(): void {
		if (this.scalingUp) {
			this.scaleFactor += this.scaleStep // Increase scale factor
			if (this.scaleFactor >= this.targetScale) {
				this.scaleFactor = this.targetScale // Cap at target scale
				this.scalingUp = false // Switch to scaling down
			}
		} else {
			this.scaleFactor -= this.scaleStep // Decrease scale factor
			if (this.scaleFactor <= 1) {
				this.scaleFactor = 1 // Cap at minimum scale
				this.isDelaying = true // Enter delay mode
			}
		}
	}

	// Returns the current scale factor
	getScaleFactor(): number {
		return this.scaleFactor
	}
}
