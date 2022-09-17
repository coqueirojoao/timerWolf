import React from 'react';
import WOLF from '../content/WOLF.png'
import LoFi from '../content/LoFi.mp3'
import NFS from '../content/NFS.mp3'
import DMC from '../content/DMC.mp3'
import DS from '../content/DS.mp3'
import AZEITONA from '../content/AZEITONA.mp3'

export default class Main extends React.Component {
  state = {
    checkedNumbers: false,
    disabled: false,
    checkedMin: '',
    checkedSec: '',
    minTime: '',
    secTime: '',
    error: false,
    musicLoFi: false,
    musicDMC: false,
    musicNFS: false,
    musicDS: false,
    verify: false,
    azeitona: false,
    azeitonaAudio: new Audio(AZEITONA),
    audioDS: new Audio(DS),
    audioDMC: new Audio(DMC),
    audioNFS: new Audio(NFS),
    audioLoFi: new Audio(LoFi)
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      azeitona: false,
      [name]: value,
    });
  };

  handleAudio = () => {
    const { verify, audioLoFi, musicLoFi, musicNFS, audioNFS, audioDMC, musicDMC, audioDS, musicDS } = this.state;
    audioNFS.volume = 0.2;
    audioDMC.volume = 0.2;
    audioLoFi.volume = 0.2;
    audioDS.volume = 0.2;
    if (musicLoFi && !verify) {
      this.setState({
        verify: true,
      })
      return audioLoFi.play();
    }
    if (musicNFS && !verify) {
      this.setState({
        verify: true,
      })
      return audioNFS.play();
    }
    if (musicDMC && !verify) {
      this.setState({
        verify: true,
      })
      return audioDMC.play();
    }
    if (musicDS && !verify) {
      this.setState({
        verify: true,
      })
      return audioDS.play();
    }
  }

  handleClick = () => {
    const myInterval = setInterval(() => {
    const { minTime, secTime, checkedNumbers, checkedMin, checkedSec } = this.state;
    if(!checkedNumbers) {
      this.setState({
        checkedNumbers: true,
        checkedMin: minTime,
        checkedSec: secTime,
      })
    }
    if (+minTime <= 0 && +secTime === 0) {
      this.setState({
        minTime: checkedMin,
        secTime: checkedSec,
        checkedNumbers: false,
        musicLoFi: false,
        musicDMC: false,
        musicNFS: false,
        musicDS: false,
        azeitona: true,
        verify: false,
        music: false,
        error: false,
        disabled: false,
      })
      this.handleAudio();
      return clearInterval(myInterval);
    }
    if (+minTime < 0 || +secTime < 0 || (!secTime && !minTime) || (isNaN(secTime) || isNaN(minTime))) {
      this.setState({
        musicDMC: false,
        azeitona: false,
        musicDS: false,
        musicNFS: false,
        musicLoFi: false,
        error: true,
      })
      return clearInterval(myInterval);
    }
    if (+secTime === 0) {
      this.setState((previousState) => ({
        error: false,
        azeitona: false,
        disabled: true,
        minTime: previousState.minTime - 1,
        secTime: 59,
      }))
      return this.handleAudio();
    }
    this.setState((previousState) => ({
      error: false,
      azeitona: false,
      disabled: true,
      secTime: +previousState.secTime - 1,
    }))
    return this.handleAudio();
  }, 1000)
  }

  render() {
    const { minTime, secTime, disabled, error, audioLoFi, audioDMC, audioNFS, audioDS, azeitona, azeitonaAudio } = this.state;
    if (!disabled) {
      audioDS.pause();
      audioDMC.pause();
      audioNFS.pause();
      audioLoFi.pause();
      audioDS.currentTime = 0;
      audioLoFi.currentTime = 0;
      audioDMC.currentTime = 0;
      audioNFS.currentTime = 0;
    }
    if (azeitona) {
      azeitonaAudio.volume = 0.5;
      azeitonaAudio.play();
    }
    return (
      <>
      <div className='container d-flex justify-content-center align-items-center height'>
        <div className='d-flex flex-column align-items-center justify-content-center mb-4'>
        <p className='display-6'>Minutes</p>
        <input type='text' value={minTime} name='minTime' className='text-center display-3 border-bottom' onChange={this.handleChange} disabled={disabled} placeholder='00' />
        </div>
        <p className='text-center display-2 mt-5'>:</p>
        <div className='d-flex flex-column align-items-center justify-content-center mb-4'>
        <p className='display-6'>Seconds</p>
        <input type='text' value={secTime} name='secTime' className='text-center display-3 border-bottom' onChange={this.handleChange} disabled={disabled} placeholder='00' />
        </div>
        </div>
        <div className='buttonBox'>
        <button type='button' className="btn btn-dark p-2"onClick={this.handleClick} disabled={disabled}>Acionar cronometro!</button>
        <button type='button' className="btn btn-dark p-2"onClick={() => {
          this.setState({ musicLoFi: true }) 
          this.handleClick() } } disabled={disabled}>Acionar timer especial lo-fi!</button>
        <button type='button' className="btn btn-dark p-2"onClick={() => {
          this.setState({ musicNFS: true }) 
          this.handleClick() } } disabled={disabled}>Acionar timer especial Need For Speed!</button>
        <button type='button' className="btn btn-dark p-2"onClick={() => {
          this.setState({ musicDMC: true }) 
          this.handleClick() } } disabled={disabled}>Acionar timer especial Devil May Cry!</button>
        <button type='button' className="btn btn-dark p-2"onClick={() => {
          this.setState({ musicDS: true }) 
          this.handleClick() } } disabled={disabled}>Acionar timer especial Dark Souls!</button>
      </div>
        {error && <p className='text-center fs-5'>Insira números válidos nos inputs</p>}
        <div className='d-flex flex-column align-items-center mt-5'>
        {disabled && <img src={WOLF} alt='wolf' width={700} />}
        <p className="mt-5 fs-5 text-center">Desenvolvido por João Coqueiro</p>
        </div>
      </>
    );
  }
}
