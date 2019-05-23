// import React, {Component} from "react"
// import ListCard from "./ListCard"
// import { LIST, HEADERS, CORS} from "../constants"
//
// class ListContainer extends Component {
//   constructor() {
//     super()
//     this.state = {
//       lists: [],
//       games: []
//     }
//   }
//
//   componentWillMount = () => {
//     this.fetchLists()
//   }
//
//   fetchLists = () => {
//     fetch(LIST)
//     .then(resp => resp.json())
//     .then(data => this.setState({
//       lists: data
//     }))
//   }
//
//   createLists = () => {
//     this.state.lists.map(list =>
//       if(list.user_id === this.props.userId) {
//         return <ListCard
//           list={list}
//           key={list.id}
//           title={list.title}
//           games={list.games}
//         />
//       }
//     )
//   }
//
//   render() {
//     if(this.state.lists === []){
//       return (
//         <div className="listContainer">
//           <h1>My Lists</h1>
//         </div>
//       )
//     } else {
//       return (
//         <div className="listContainer">
//           <h1>My Lists</h1>
//           <ul>
//             {this.createLists()}
//           </ul>
//         </div>
//       )
//     }
//   }
//
// }
//
// export default ListContainer
