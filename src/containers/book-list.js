import React, {Component} from 'react'
import {connect} from 'react-redux'
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
    renderList(){
        return this.props.books.map((book) => {
            return (
                <li
                    onClick={()=> this.props.selectBook(book)}
                    key={book.title}
                    className="list-group-item">
                    {book.title}
                </li>
            );
        });
    }

    render() {
        return(
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}


function mapStateToProps(state){
    //whatever is returned will show up as props
    //inside of booklist
    return {
        books: state.books
    };
}

//Anything returned from this function will end as a props inside the component
//so I can can this.props.selectBook, it is important to say that the selectBook that
//we are calling is the actual key of the obj in the bindActionCreators, and that key will
//execute the function itself, so we can have {someStuf: selectBook}, and at the end
//in order to dispatch the selectedBook action we will have to make this.props.someStuff
function mapDispatchToProps(dispatch){
    //the idea behind bindActionCreator is that for example when I call the selectBook,
    //the action will be dispatched to all the reducers
    return bindActionCreators({  selectBook: selectBook  }, dispatch)
}

//basically thanks to this connect we can make use of the general state and the actions in the
//container
export default connect(mapStateToProps, mapDispatchToProps)(BookList)