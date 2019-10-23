import React from "react"
import { Grid, IconButton, Typography } from "@material-ui/core"
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled"
import PauseCircleFilled from "@material-ui/icons/PauseCircleFilled"
import { Slider } from "material-ui-slider"
import "./AudioPlayer.css"

export class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.player = React.createRef()
    this.state = {
      currentTime: null,
      duration: null,
      playerStatus: "paused"
    }
  }

  componentDidMount() {
    this.player.current.addEventListener("timeupdate", e => this.setState({ currentTime: e.target.currentTime }))
    this.player.current.addEventListener("loadedmetadata", () => this.setState({ duration: this.player.current.duration }))
    this.player.current.addEventListener("ended", () => this.setState({ playerStatus: "end" }))
  }

  componentWillUnmount() {
    this.player.current.removeEventListener("timeupdate")
    this.player.current.removeEventListener("loadedmetadata")
    this.player.current.removeEventListener("ended")
  }

  componentDidUpdate(prevProps, prevState) {
    if (["paused", "end"].includes(prevState.playerStatus) && this.state.playerStatus === "playing")
      this.player.current.play()

    if (prevState.playerStatus === "playing" && this.state.playerStatus === "paused")
      this.player.current.pause()
  }

  onPlay = () => this.setState({ playerStatus: "playing" })

  onPause = () => this.setState({ playerStatus: "paused" })
  
  getProgressFromCurrentTime = (currentTime, duration) => parseFloat((100 * (currentTime / duration)).toString())

  getCurrentTimeFromProgress = (progress, duration) => parseFloat(((progress * duration) / 100).toString())

  getTime = time => {
    if(!isNaN(time)) return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)  
  }

  onChangeSlider = progress => {
    const currentTime = this.getCurrentTimeFromProgress(progress, this.state.duration)
    
    this.player.current.currentTime = currentTime
    this.setState({ currentTime })
  }

  render() {
    return (
      <div className="audio-player-wrapper">
        <audio
          ref={this.player}
          src={this.props.src}
        />
        {this.props.title &&
        <Typography variant="h6" className="audio-title">{this.props.title}</Typography>}
        <Grid container spacing={8} className="player-container">
          <Grid item className="control-button">
            {["paused", "end"].includes(this.state.playerStatus) &&
            <IconButton onClick={this.onPlay}>
              <PlayCircleFilled />
            </IconButton>}
            {this.state.playerStatus === "playing" &&
            <IconButton onClick={this.onPause}>
              <PauseCircleFilled />
            </IconButton>}
          </Grid>
          <Grid item className="slider-wrapper">
            <Slider
              onChange={this.onChangeSlider}
              value={this.getProgressFromCurrentTime(this.state.currentTime, this.state.duration)}
              color="#1f8ad6"
            />
          </Grid>
          <Grid item>
            {`${this.getTime(this.state.currentTime)} / ${this.getTime(this.state.duration)}`}
          </Grid>
        </Grid>
      </div>
    )
  }
}
