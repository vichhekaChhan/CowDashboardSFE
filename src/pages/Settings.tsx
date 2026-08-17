import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Wifi, Save, CheckCircle2, Bell, ChevronDown } from 'lucide-react';

export function Settings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [isSecurityDropdownOpen, setIsSecurityDropdownOpen] = useState(false);
  const securityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (securityDropdownRef.current && !securityDropdownRef.current.contains(event.target as Node)) {
        setIsSecurityDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    profile: {
      fullName: 'Sal The Butcher',
      email: 'sal@camtech.edu',
      farmName: 'Camtech experimental Farm',
      password: ''
    },
    wifi: {
      ssid: '',
      password: '',
      securityType: 'WPA2',
      showPassword: false
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      beepSound: true,
      warningTrigger: true
    }
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    // Here you would normally send formData to backend
    console.log("Settings saved:", formData);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggle = (field: keyof typeof formData.notifications, value: boolean, label: string) => {
    updateNestedState('notifications', field, value);
    showToast(`${label} turned ${value ? 'on' : 'off'}`);
  };

  const updateNestedState = (section: keyof typeof formData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="h-full flex flex-col relative transition-colors">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.title', 'Settings')}</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('settings.subtitle', 'Manage your account and configure your devices.')}</p>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl shadow-lg flex items-center space-x-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle2 size={18} className="text-green-400 dark:text-green-600" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 flex-1">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <User size={20} className={activeTab === 'profile' ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'} />
              <span>{t('settings.profile.tab', 'Profile Information')}</span>
            </button>
            <button
              onClick={() => setActiveTab('wifi')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'wifi'
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Wifi size={20} className={activeTab === 'wifi' ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'} />
              <span>{t('settings.wifi.tab', 'WiFi Configuration')}</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Bell size={20} className={activeTab === 'notifications' ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'} />
              <span>{t('settings.notifications.tab', 'Notifications')}</span>
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="w-full max-w-4xl h-fit bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8 transition-colors">
          {showSuccess && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl flex items-center space-x-2 border border-green-100 dark:border-green-900/50">
              <CheckCircle2 size={20} className="text-green-500 dark:text-green-400" />
              <span className="font-medium">{t('settings.successMsg', 'Settings saved successfully.')}</span>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('settings.profile.title', 'Profile Settings')}</h3>
              
              <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.profile.fullName', 'Full Name')}</label>
                    <input 
                      type="text" 
                      value={formData.profile.fullName}
                      onChange={(e) => updateNestedState('profile', 'fullName', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.profile.email', 'Email Address')}</label>
                    <input 
                      type="email" 
                      value={formData.profile.email}
                      onChange={(e) => updateNestedState('profile', 'email', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.profile.farmName', 'Farm Name')}</label>
                  <input 
                    type="text" 
                    value={formData.profile.farmName}
                    onChange={(e) => updateNestedState('profile', 'farmName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('settings.profile.security', 'Security')}</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.profile.password', 'New Password')}</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={formData.profile.password}
                      onChange={(e) => updateNestedState('profile', 'password', e.target.value)}
                      className="w-full max-w-sm px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-start">
                  <button type="submit" className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                    <Save size={18} />
                    <span>{t('settings.save', 'Save Changes')}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'wifi' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('settings.wifi.title', 'Microcontroller WiFi Configuration')}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{t('settings.wifi.description', 'Enter the WiFi credentials that your smart scales will use to connect to the network. Generate a config file to flash onto your devices.')}</p>
                </div>
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                  <Wifi size={24} />
                </div>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const configStr = JSON.stringify(formData.wifi, null, 2);
                const encodedUri = encodeURI("data:text/json;charset=utf-8," + configStr);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "scale_wifi_config.json");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                handleSave(e);
              }} className="space-y-6 max-w-lg">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.wifi.ssid', 'Network Name (SSID)')}</label>
                      <div className="relative">
                        <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                        <input 
                          type="text" 
                          placeholder="e.g. Farm_Network_2G"
                          value={formData.wifi.ssid}
                          onChange={(e) => updateNestedState('wifi', 'ssid', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative" ref={securityDropdownRef}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.wifi.security', 'Security Type')}</label>
                      <button
                        type="button"
                        onClick={() => setIsSecurityDropdownOpen(!isSecurityDropdownOpen)}
                        className="flex items-center justify-between w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 font-sans cursor-pointer transition-shadow"
                      >
                        <span>
                          {formData.wifi.securityType === 'WPA2' ? 'WPA2 Personal' :
                           formData.wifi.securityType === 'WPA3' ? 'WPA3 Personal' :
                           formData.wifi.securityType === 'WEP' ? 'WEP' :
                           'Open (No Password)'}
                        </span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform ${isSecurityDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isSecurityDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                          {[
                            { value: 'WPA2', label: 'WPA2 Personal' },
                            { value: 'WPA3', label: 'WPA3 Personal' },
                            { value: 'WEP', label: 'WEP' },
                            { value: 'Open', label: 'Open (No Password)' }
                          ].map(option => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                updateNestedState('wifi', 'securityType', option.value);
                                setIsSecurityDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                formData.wifi.securityType === option.value 
                                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium' 
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {formData.wifi.securityType !== 'Open' && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.wifi.password', 'WiFi Password')}</label>
                        </div>
                        <div className="relative">
                          <input 
                            type={formData.wifi.showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.wifi.password}
                            onChange={(e) => updateNestedState('wifi', 'password', e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => updateNestedState('wifi', 'showPassword', !formData.wifi.showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm font-medium"
                          >
                            {formData.wifi.showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">
                    <Save size={18} />
                    <span>{t('settings.wifi.generateBtn', 'Download Config File')}</span>
                  </button>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                    This will download a secure .json file you can upload to your scale hardware.
                  </p>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('settings.notifications.title', 'Notification Preferences')}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">{t('settings.notifications.description', 'Choose how you want to be notified about your herd.')}</p>
              
              <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{t('settings.notifications.email', 'Email Alerts')}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.notifications.emailDesc', 'Receive daily summaries and critical alerts via email.')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.notifications.emailAlerts} onChange={(e) => handleToggle('emailAlerts', e.target.checked, 'Email Alerts')} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{t('settings.notifications.sms', 'SMS Alerts')}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.notifications.smsDesc', 'Get text messages for critical herd health warnings.')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.notifications.smsAlerts} onChange={(e) => handleToggle('smsAlerts', e.target.checked, 'SMS Alerts')} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('settings.notifications.rulesTitle', 'Rules & Sound')}</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{t('settings.notifications.beep', 'Capture beep feedback sound')}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.notifications.beepDesc', 'Plays confirmation chime on client browser as soon as stable loads are locked.')}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={formData.notifications.beepSound} onChange={(e) => handleToggle('beepSound', e.target.checked, 'Beep feedback sound')} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{t('settings.notifications.warning', 'Warning notifications trigger')}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.notifications.warningDesc', 'Push notification banner visual indicators immediately on drastic weight drops.')}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={formData.notifications.warningTrigger} onChange={(e) => handleToggle('warningTrigger', e.target.checked, 'Warning notifications')} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-start">
                  <button type="submit" className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                    <Save size={18} />
                    <span>{t('settings.save', 'Save Changes')}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
