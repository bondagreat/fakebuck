import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import RegisterForm from './RegisterForm';

export default function RegisterContainer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeydown = e => {
      if (e.keyCode === 27) {
        setOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [setOpen])

  return (
    <div className="text-center tw-py-2.5">
      <button
        className="btn fw-bold btn-green rounded-md h-12 "
        type="button"
        onClick={() => setOpen(true)}
      >
        Create New Account
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <RegisterForm onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
