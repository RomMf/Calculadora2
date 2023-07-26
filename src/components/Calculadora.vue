<template>
    <div class="calculator">
      <input type="text" v-model="display" @keypress="onKeyPress">
      <div class="buttons">
        <button @click="addToDisplay('7')">7</button>
        <button @click="addToDisplay('8')">8</button>
        <button @click="addToDisplay('9')">9</button>
        <button @click="addToDisplay('+')">+</button>
        <button @click="addToDisplay('4')">4</button>
        <button @click="addToDisplay('5')">5</button>
        <button @click="addToDisplay('6')">6</button>
        <button @click="addToDisplay('-')">-</button>
        <button @click="addToDisplay('1')">1</button>
        <button @click="addToDisplay('2')">2</button>
        <button @click="addToDisplay('3')">3</button>
        <button @click="addToDisplay('*')">*</button>
        <button @click="addToDisplay('0')">0</button>
        <button @click="addToDisplay('.')">.</button>
        <button @click="calculate()">=</button>
        <button @click="addToDisplay('/')">/</button>
        <button @click="clearDisplay()">C</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["userId"],
    data() {
    return {
      display: "",
      history: [],
    };
    },
    methods: {
      addToDisplay(value) {
        this.display += value;
      },
      calculate() {
        try {
          this.display = eval(this.display);
        } catch (error) {
          this.display = "Error";
        }
      },
      clearDisplay() {
        this.display = "";
      },
      onKeyPress(event) {
        if (
          (event.key >= "0" && event.key <= "9") ||
          event.key === "." ||
          event.key === "+" ||
          event.key === "-" ||
          event.key === "*" ||
          event.key === "/" ||
          event.key === "=" ||
          event.key === "Enter" ||
          event.key === "Backspace" ||
          event.key === "Delete"
        ) {
          return true;
        } else {
          event.preventDefault();
        }
      },
      calculate() {
      try {
        const result = eval(this.display);
        this.history.push({ id: Date.now(), expression: this.display, result });

        // Guarda el historial en Firebase
        this.saveHistoryToFirebase();

        this.display = result;
      } catch (error) {
        this.display = "Error";
      }
    },
    saveHistoryToFirebase() {
      db.collection("users")
        .doc(this.userId)
        .collection("history")
        .add({
          expression: this.display,
          result: eval(this.display),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          console.log("Historial guardado en Firebase con ID:", docRef.id);
        })
        .catch((error) => {
          console.error("Error al guardar historial en Firebase:", error);
        });
    },
  },
  created() {
    // Recuperar el historial almacenado en Firebase para el usuario actual
    db.collection("users")
      .doc(this.userId)
      .collection("history")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        this.history = querySnapshot.docs.map((doc) => doc.data());
      })
      .catch((error) => {
        console.error("Error al obtener historial de Firebase:", error);
      });
  },
    
  };
  </script>
  
  <style>
  .calculator {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  input {
    width: 100%;
    font-size: 18px;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
  }
  
  button {
    font-size: 18px;
    padding: 10px;
    cursor: pointer;
  }
  </style>
  