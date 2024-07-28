import React from 'react';

const PopupConfirm = ({ price, userCoins, onConfirm, onCancel, onPurchaseCoins, message }) => {

    const insufficientFunds = userCoins < price;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-md shadow-lg">
                <h2 className="text-lg font-bold mb-4">Xác nhận mua tập</h2>
                <p className="mb-4">
                    {message ? message : `Bạn có chắc chắn muốn mua tập này với giá ${price} xu không?`}
                </p>
                <div className="flex justify-center">
                    {
                        !message && (
                            <button 
                                className="px-4 py-2 rounded-md hover:bg-gray hover:text-white"
                                onClick={onConfirm}
                            >
                                Xác nhận
                            </button>
                        )
                    }
                    {
                        !message && (
                            <button 
                                className="px-4 py-2 mr-2 bg-gray-200 rounded-md hover:bg-gray hover:text-white"
                                onClick={onCancel}
                            >
                                Hủy
                            </button>
                        )
                    }
                    {
                        message && (
                            <>
                                <button 
                                    className="px-4 py-2 rounded-md hover:bg-gray hover:text-white"
                                    onClick={onPurchaseCoins}
                                >
                                    Mua xu
                                </button>
                                <button 
                                    className="px-4 py-2 mr-2 bg-blue-600 rounded-md hover:bg-gray hover:text-white"
                                    onClick={onCancel}
                                >
                                    Đóng
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PopupConfirm;
