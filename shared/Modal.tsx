import { Modal as DynamicModal } from 'antd';
import React from 'react'

interface IProps {
    children: React.ReactNode;
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    width?: number;
    okText?: string;
    cancelText?: string;
    title?: string;
}

const Modal = ({ children,
    modalVisible,
    setModalVisible,
    width,
    title,
    okText }: IProps) => {
    return (
        <DynamicModal
            title={title}
            open={modalVisible}
            okText={okText}
            onCancel={() => setModalVisible(false)}
            okButtonProps={{
                style: { display: "none" },
            }}
            cancelButtonProps={{
                style: { display: "none" },
            }}
        >
            {children}
        </DynamicModal>
    )
}

export default Modal
