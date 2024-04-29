class Form {
  constructor(inputElements) {
    this.fields = inputElements;
  }
  render() {
    this.formElement = document.createElement('form');
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    this.fields.forEach(function (field) {
      const divElement = document.createElement('div');

      const labelElement = document.createElement('label');
      labelElement.textContent = field.label;
      divElement.appendChild(labelElement);

      const inputElement = document.createElement(field.type);
      for (let key in field) {
        if (key != 'type' && key != 'label') {
          inputElement.setAttribute(key, key !== 'children' && field[key]);
          if (key == 'children') {
            field.children.forEach(function (item) {
              for (let key in item) {
                if (key == 'text') {
                  const opt = document.createElement('option');
                  opt.setAttribute(key, item[key]);
                  opt.textContent = item[key];
                  inputElement.appendChild(opt);
                }
              }
            });
          }
        }
      }
      divElement.appendChild(inputElement);
      wrapper.appendChild(divElement);
    });
    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.addEventListener('click', this.handleSubmit.bind(this));
    wrapper.appendChild(button);
    this.formElement.appendChild(wrapper);
    document.getElementById('app').append(this.formElement);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.formElement);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    alert(JSON.stringify(data));
  }
}
export default Form;
