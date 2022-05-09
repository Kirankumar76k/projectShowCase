import {Component} from 'react'
import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
class App extends Component {
  state = {
    initialList: categoriesList,
    selectOption: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
    musicList: [],
  }

  componentDidMount = () => {
    this.getProjects()
  }

  getProjects = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {selectOption} = this.state
    const api = `https://apis.ccbp.in/ps/projects?category=${selectOption}`
    const response = await fetch(api)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.projects.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      this.setState({
        musicList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeList = event => {
    this.setState({selectOption: event.target.value})
  }

  // renderList = () => {

  //     const {categoriesList}=this.state
  //     return(

  //     )
  // }

  render() {
    const {initialList} = this.state

    return (
      <div className="bg-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </nav>
        <div className="body-container">
          <select onChange={this.onChangeList}>
            {categoriesList.map(eachItem => (
              <option value={eachItem.displayText}>
                {eachItem.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

export default App
