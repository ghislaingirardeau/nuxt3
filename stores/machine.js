export const useMachine = defineStore("machine", {
  state: () => ({
    etat: "Idle",
  }),
  actions: {
    transitionIdle() {
      this.etat = "Idle";
    },
    transitionEdit() {
      this.etat = "edit";
    },
    transitionSubmit(oldTitle, newTitle) {
      console.log(oldTitle, newTitle);
      return new Promise((resolve, reject) => {
        this.etat = "Loading";
        setTimeout(() => {
          if (oldTitle === newTitle) {
            this.etat = "edit";
            reject();
          } else {
            this.etat = "success";
            resolve();
          }
        }, 4000);
      });
    },
  },
});
