import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, X, RefreshCw } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const PWAUpdatePrompt = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error: any) {
      console.log('SW registration error', error);
    },
  });

  // 处理PWA安装提示
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    }
  };

  const handleUpdateApp = () => {
    updateServiceWorker(true);
  };

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setShowInstallPrompt(false);
  };

  return (
    <>
      {/* PWA 安装提示 */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
          >
            <Card className="shadow-2xl border-primary/20 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Download size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">安装应用</h3>
                      <Badge variant="secondary" className="text-xs">
                        离线可用
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInstallPrompt(false)}
                  >
                    <X size={14} />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  将此应用添加到主屏幕，享受更好的使用体验！
                </p>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleInstallApp}
                    className="flex-1"
                  >
                    <Download size={14} className="mr-1" />
                    安装
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowInstallPrompt(false)}
                  >
                    稍后
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 离线就绪提示 */}
      <AnimatePresence>
        {offlineReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80"
          >
            <Card className="shadow-lg border-green-500/20 bg-green-50 dark:bg-green-950">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      应用已可离线使用
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={close}
                  >
                    <X size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 更新可用提示 */}
      <AnimatePresence>
        {needRefresh && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
          >
            <Card className="shadow-2xl border-blue-500/20 bg-blue-50 dark:bg-blue-950">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <RefreshCw size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-blue-700 dark:text-blue-300">
                        发现新版本
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        推荐更新
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={close}
                  >
                    <X size={14} />
                  </Button>
                </div>
                
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                  新版本包含性能改进和功能增强
                </p>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleUpdateApp}
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    <RefreshCw size={14} className="mr-1" />
                    立即更新
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={close}
                  >
                    稍后
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAUpdatePrompt;