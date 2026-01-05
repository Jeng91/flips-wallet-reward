import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Bell, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { Card } from '../components/ui/Card';

const Settings = () => {
    const [language, setLanguage] = useState('th');
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState(true);
    const [sound, setSound] = useState(true);

    return (
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <SettingsIcon className="w-7 h-7 text-primary" />
                Settings
            </h1>

            {/* Language */}
            <Card className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Language
                </h3>
                <div className="flex gap-3">
                    <button
                        onClick={() => setLanguage('th')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${language === 'th'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        🇹🇭 ไทย
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${language === 'en'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        🇺🇸 English
                    </button>
                </div>
            </Card>

            {/* Theme */}
            <Card className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    Theme
                </h3>
                <div className="flex gap-3">
                    <button
                        onClick={() => setTheme('light')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${theme === 'light'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <Sun className="w-5 h-5" />
                        Light
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${theme === 'dark'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <Moon className="w-5 h-5" />
                        Dark
                    </button>
                </div>
            </Card>

            {/* Notifications */}
            <Card className="mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Bell className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Push Notifications</h3>
                            <p className="text-sm text-gray-500">Receive alerts about your rewards</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setNotifications(!notifications)}
                        className={`w-14 h-8 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-gray-300'
                            }`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform shadow ${notifications ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                    </button>
                </div>
            </Card>

            {/* Sound */}
            <Card>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            {sound ? <Volume2 className="w-6 h-6 text-purple-600" /> : <VolumeX className="w-6 h-6 text-purple-600" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Sound Effects</h3>
                            <p className="text-sm text-gray-500">Play sounds for actions</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSound(!sound)}
                        className={`w-14 h-8 rounded-full transition-colors relative ${sound ? 'bg-primary' : 'bg-gray-300'
                            }`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform shadow ${sound ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                    </button>
                </div>
            </Card>

            {/* Version Info */}
            <div className="mt-8 text-center text-gray-400 text-sm">
                <p>FLIPS ID v1.0.0</p>
                <p>© 2024 FLIPS ID Corporation</p>
            </div>
        </div>
    );
};

export default Settings;
