let classes = 'show';

export default function displayToast(text, error) {
  const toast = document.getElementById('toast-message');
  classes += error ? ' error' : '';
  toast.className = classes;
  toast.innerHTML = text;
  setTimeout(() => {
    toast.className = toast.className.replace(classes, '');
  }, 3000);
}