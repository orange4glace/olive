import Timeline from "internal/timeline/timeline";

export default class Renderer {

    constructor(canvas: HTMLCanvasElement) {
        
    }

    render(timeline: Timeline) {
        timeline.tracks.forEach(track => {
            const trackItem = track.getTrackItemAt(timeline.currentTime);
            if (trackItem != null) {

            }
        })
    }

}