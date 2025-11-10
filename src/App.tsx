import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Wallet, Send, Download, BarChart3, Shield } from 'lucide-react';
import { DashboardScreen } from './components/DashboardScreen';
import { InheritScreen } from './components/InheritScreen';
import { ReceiveScreen } from './components/ReceiveScreen';

export default function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [activeTab, setActiveTab] = useState('inherit');

  const handleConnectWallet = () => {
    // Mock wallet connection
    setWalletAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
    setIsWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    setWalletAddress('');
    setIsWalletConnected(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-neutral-900">Heritage</h1>
                <p className="text-sm text-neutral-500">Secure Data Inheritance</p>
              </div>
            </div>

            {isWalletConnected ? (
              <div className="flex items-center gap-3">
                <div className="rounded-lg border bg-neutral-50 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-neutral-600" />
                    <span className="text-sm text-neutral-700">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                </div>
                <Button variant="outline" onClick={handleDisconnectWallet}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={handleConnectWallet}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {!isWalletConnected ? (
          <div className="flex min-h-[600px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100">
                <Wallet className="h-10 w-10 text-neutral-600" />
              </div>
              <h2 className="mb-2 text-neutral-900">Connect Your Wallet</h2>
              <p className="mb-6 text-neutral-600">
                Connect your wallet on Arbitrum testnet to get started
              </p>
              <Button size="lg" onClick={handleConnectWallet}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 grid w-full max-w-xl grid-cols-3 bg-white">
              <TabsTrigger value="inherit" className="gap-2">
                <Send className="h-4 w-4" />
                Inheritance
              </TabsTrigger>
              <TabsTrigger value="receive" className="gap-2">
                <Download className="h-4 w-4" />
                Receive
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inherit">
              <InheritScreen walletAddress={walletAddress} />
            </TabsContent>

            <TabsContent value="receive">
              <ReceiveScreen walletAddress={walletAddress} />
            </TabsContent>

            <TabsContent value="dashboard">
              <DashboardScreen walletAddress={walletAddress} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
