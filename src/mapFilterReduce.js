import './App.css';

function mapFilterReduce() {

    const arr = [2, 3, 4, 5]

  return (
    <div className="App">
      {arr.map((value)=>{
        return value*10
      })
      }
      {arr.filter((value)=>{
        return value>0
      })
      }
      {arr.reduce((a,b)=>{
        return a*b
      })
      }
    </div>
  );
}

export default mapFilterReduce;