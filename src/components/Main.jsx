import React from 'react';
import WOLF from '../content/WOLF.png'
import LifeIsGood from '../content/LifeIsGood.mp3'

export default class Main extends React.Component {
  state = {
    disabled: false,
    minTime: '',
    secTime: '',
    error: false,
    music: false,
    verify: false,
    audio: new Audio(LifeIsGood),
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleAudio = () => {
    const { music, verify, audio } = this.state;
    audio.volume = 0.2
    if (music && !verify) {
      this.setState({
        verify: true,
      })
      return audio.play();
    }
  }

  handleClick = () => {
    const myInterval = setInterval(() => {
    const { minTime, secTime } = this.state;
    if (+minTime <= 0 && +secTime === 0) {
      this.setState({
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
        music: false,
        error: true,
      })
      return clearInterval(myInterval);
    }
    if (+secTime === 0) {
      this.setState((previousState) => ({
        music: true,
        error: false,
        disabled: true,
        minTime: previousState.minTime - 1,
        secTime: 59,
      }))
      return this.handleAudio();
    }
    this.setState((previousState) => ({
      music: true,
      error: false,
      disabled: true,
      secTime: +previousState.secTime - 1,
    }))
    return this.handleAudio();
  }, 1000)
  }

  render() {
    const { minTime, secTime, disabled, error, audio } = this.state;
    if (!disabled) {
      audio.pause();
      audio.currentTime = 0;
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
        {error && <p>Insira números válidos nos inputs</p>}
        {disabled && <img src={WOLF} alt='wolf' width={700} />}
        <p className="mt-5 fs-5 border-bottom">Desenvolvido por João Coqueiro</p>
      </div>
      </>
    );
  }
}
