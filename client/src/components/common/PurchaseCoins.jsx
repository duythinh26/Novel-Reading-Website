import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';

const PurchaseCoins = () => {

    let { userAuth: { access_token } } = useContext(UserContext);

    const [coinAmount, setCoinAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePurchase = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/purchase-coins', {
                coin_ammount: parseInt(coinAmount, 10),
                card_number: cardNumber,
                expiry_date: expiryDate,
                cvv: cvv
            }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
    
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response.data.error);
            setMessage('');
        }
    };

    return (
        <div className="mt-36 max-w-[400px] border bg-[#f9f9f9] shadow-[0_4px_8px_rgba(0,0,0,0.1)] mx-auto my-0 p-5 rounded-[10px] border-solid border-[#ddd]">
            <h2 className="text-center text-[#333] text-2xl font-times">Mua xu</h2>
            <form onSubmit={handlePurchase}>
                <div className="mb-[15px]">
                    <label className="block text-xl font-[bold] text-[#555] mb-[5px]">Số lượng xu</label>
                    <input
                        type="number"
                        value={coinAmount}
                        onChange={(e) => setCoinAmount(e.target.value)}
                        min="1"
                        required
                        className="w-full border text-base box-border p-2.5 rounded-[5px] border-solid border-[#ccc]"
                    />
                </div>
                <div className="mb-[15px]">
                    <label className="block text-xl font-[bold] text-[#555] mb-[5px]">Số thẻ tín dụng</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        pattern="\d{16}"
                        title="Số thẻ tín dụng phải có 16 chữ số"
                        className="w-full border text-base box-border p-2.5 rounded-[5px] border-solid border-[#ccc]"
                    />
                </div>
                <div className="mb-[15px]">
                    <label className="block text-xl font-[bold] text-[#555] mb-[5px]">Ngày hết hạn (MM/YY)</label>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                        pattern="(0[1-9]|1[0-2])\/\d{2}"
                        title="Ngày hết hạn phải có định dạng MM/YY"
                        className="w-full border text-base box-border p-2.5 rounded-[5px] border-solid border-[#ccc]"
                    />
                </div>
                <div className="mb-[30px]">
                    <label className="block text-xl font-[bold] text-[#555] mb-[5px]">Mã CVV</label>
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        pattern="\d{3,4}"
                        title="CVV phải có 3 hoặc 4 chữ số"
                        className="w-full border text-base box-border p-2.5 rounded-[5px] border-solid border-[#ccc]"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#28a745] text-white text-lg cursor-pointer transition-[background-color] duration-[0.3s] p-2.5 rounded-[5px] border-[none] hover:bg-[#218838]"
                >
                    Mua Xu
                </button>
            </form>
            {message && <div className="text-[#28a745] text-center mt-[15px]">{message}</div>}
            {error && <div className="text-[#dc3545] text-center mt-[15px]">{error}</div>}
        </div>
    );
};

export default PurchaseCoins;
