/**
 * DevMaK3 Audio Synthesizer (Silenced / Disabled by preference)
 */
class DevMak3Audio {
  constructor() {
    this.isMuted = true;
  }
  init() {}
  toggleSound() { return false; }
  playIntroChime() {}
  startAmbientDrone() {}
  stopAmbientDrone() {}
  playLaserChime() {}
  playSuccessChord() {}
  playTypingClick() {}
  playQuantumWarp() {}
}

window.devmak3Audio = new DevMak3Audio();
