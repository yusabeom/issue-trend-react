import React, { forwardRef, useImperativeHandle } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Confirm = forwardRef((props, ref) => {
  const { onConfirm } = props;

  const submit = () => {
    confirmAlert({
      message: '정말로 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
      buttons: [
        {
          label: '취소',
        },
        {
          label: '삭제',
          onClick: () => onConfirm(true),
        },
      ],
    });
  };

  useImperativeHandle(ref, () => ({
    callSubmit: submit,
  }));

  return (
    <div>
      <button onClick={submit} style={{ display: 'none' }}>
        Click me
      </button>
    </div>
  );
});

Confirm.displayName = 'Confirm';
export default Confirm;
