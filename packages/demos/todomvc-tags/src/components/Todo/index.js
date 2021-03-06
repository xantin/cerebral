import React from 'react'
import classnames from 'classnames'
import { connect } from '@cerebral/react'
import { state, props, sequences } from 'cerebral'

export default connect(
  {
    todo: state`todos.${props`uid`}`,
    todoDoubleClicked: sequences`editTodo`,
    changeTodoTitle: sequences`changeTodoTitle`,
    submitTodoTitle: sequences`submitTodoTitle`,
    toggleTodoCompleted: sequences`toggleTodoCompleted`,
    removeTodo: sequences`removeTodo`,
  },
  function Todo({
    uid,
    isEditing,
    todo,
    todoDoubleClicked,
    changeTodoTitle,
    submitTodoTitle,
    toggleTodoCompleted,
    removeTodo,
  }) {
    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: isEditing,
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => toggleTodoCompleted({ uid })}
            checked={todo.completed}
          />
          <label onDoubleClick={() => todoDoubleClicked({ uid })}>
            {todo.title}
          </label>
          <button className="destroy" onClick={() => removeTodo({ uid })} />
        </div>
        {isEditing && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submitTodoTitle({ uid })
            }}
          >
            <input
              autoFocus
              className="edit"
              value={isEditing ? todo.editedTitle : todo.title}
              onBlur={() => submitTodoTitle({ uid })}
              onChange={(e) => changeTodoTitle({ uid, title: e.target.value })}
            />
          </form>
        )}
      </li>
    )
  }
)
