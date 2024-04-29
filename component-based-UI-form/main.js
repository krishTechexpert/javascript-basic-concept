import Form from './form.js';

const inputElements = [
  { type: 'input', placeholder: 'enter name', name: 'name', label: 'name' },
  { type: 'input', placeholder: 'enter email', name: 'email', label: 'email' },
  {
    type: 'textarea',
    placeholder: 'Enter your message',
    name: 'message',
    rows: 4,
    label: 'message',
  },
  {
    type: 'select',
    name: 'department',
    label: 'department',
    required: true,
    children: [
      { value: '', text: 'Select department' },
      { value: 'sales', text: 'Sales' },
      { value: 'support', text: 'Support' },
      { value: 'billing', text: 'Billing' },
    ],
  },
];

const form = new Form(inputElements);
form.render();
