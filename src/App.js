import "./App.css";
import Timer from "easytimer.js";
import { connect } from "react-redux";
import { setData, removeData } from "./store/data";
import { useState, useEffect } from "react";

const App = (props) => {
  const [title, setTitle] = useState("");
  let [time, setTime] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTime((time += 1));
    }, 1000);
  }, [time]);

  const onSubmit = (e) => {
    e.preventDefault();

    const _timer = () => {
      const timer = new Timer();
      timer.start({ precision: "seconds" });
      return {
        timer: timer.getTimeValues(),
        start: timer.start,
        pause: timer.pause,
      };
    };

    props.setData({
      title: title,
      timer: _timer(),
    });

    setTitle("");
  };

  const deleteClick = (task) => {
    const data = window.confirm("Вы уверены ?");
    if (data) props.removeData(task);
  };

  return (
    <div className="App">
      <form className="uk-margin-top" onSubmit={onSubmit}>
        <div class="uk-margin">
          <div uk-form-custom="target: true">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              class="uk-input uk-form-width-large"
              placeholder="Введите название задачи"
              required
            />
          </div>
          <button class="uk-button uk-button-default">Создать</button>
        </div>
      </form>

      {[...props.tasks].reverse().map((task) => (
        <div
          class="uk-card uk-card-default uk-width-1-2@m uk-align-center"
          key={task.id}
        >
          <div class="uk-card-header">
            <h3 class="uk-card-title uk-margin-remove-bottom uk-align-left">
              {task.title}
            </h3>
          </div>
          <div class="uk-card-body">
            <div class="uk-align-left">
              <h2>
                {task.timer.timer.hours.toString()}:
                {task.timer.timer.minutes.toString()}:
                {task.timer.timer.seconds.toString()}
              </h2>
            </div>
          </div>
          <div class="uk-card-footer uk-text-bold">
            <div class="uk-align-left">
              <button
                onClick={task.timer.start}
                class="uk-button uk-button-primary uk-margin-small-right"
              >
                <i class="fa fa-play-circle uk-margin-small-right"></i>
                Start
              </button>
              <button
                onClick={task.timer.pause}
                class="uk-button uk-button-primary uk-margin-small-right"
              >
                <i class="fa fa-pause-circle uk-margin-small-right"></i>
                Stop
              </button>
            </div>

            <button
              onClick={() => deleteClick(task)}
              class="uk-button uk-button-danger uk-align-right"
            >
              <i class="fa fa-trash uk-margin-small-right"></i>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.data.tasks,
});

export default connect(mapStateToProps, { setData, removeData })(App);
