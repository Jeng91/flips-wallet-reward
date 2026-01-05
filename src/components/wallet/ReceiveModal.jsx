import React, { useState } from 'react';
import { X, ArrowDownLeft, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ReceiveModal = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);
    const walletAddress = 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE';

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Receive</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 text-center space-y-6">
                    {/* QR Code */}
                    <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 inline-block">
                        <QRCodeSVG
                            value={walletAddress}
                            size={180}
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-2">Your Wallet Address</p>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                            <code className="flex-1 text-xs text-gray-700 font-mono truncate">
                                {walletAddress}
                            </code>
                            <button
                                onClick={handleCopy}
                                className="p-2 bg-white rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400">
                        Only send TRX or TRC-20 tokens to this address
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReceiveModal;
