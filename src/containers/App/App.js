import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { exampleActionSync, exampleActionAsync } from '../../actions/exampleAction'

class App extends Component {
  static propTypes = {
    exampleActionSync: PropTypes.func.isRequired,
    exampleActionAsync: PropTypes.func.isRequired,
    message: PropTypes.string,
    children: PropTypes.node
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  handleClick (isSyncAction) {
    const { exampleActionSync, exampleActionAsync } = this.props

    if (isSyncAction) {
      exampleActionSync()
    } else {
      exampleActionAsync()
    }
  }

  render () {
    const { message } = this.props
    console.info(message)

    return (
      <div>
        <h1>App</h1>
        <button className="sync-button" onClick={this.handleClick.bind(this, true)}>Sync Click</button>
        <button className="async-button" onClick={this.handleClick.bind(this, false)}>Async Click</button>
        <p>{message}</p>
        {this.props.children}
      </div>
    )
  }
}

// action creators to manipulate redux store
// We map these actions onto the props for a component
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    exampleActionSync,
    exampleActionAsync
  }, dispatch)
}

// redux store flowing into your module
function mapStateToProps (state) {
  console.log('REDUX STATE:', state)

  return {
    message: state.example.message
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
