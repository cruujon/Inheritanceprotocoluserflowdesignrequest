import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Send, Download, FileText, TrendingUp } from 'lucide-react';
import { InheritanceGraph } from './InheritanceGraph';

interface DashboardScreenProps {
  walletAddress: string;
}

export function DashboardScreen({ walletAddress }: DashboardScreenProps) {
  // Mock statistics
  const stats = {
    totalInheritances: 12,
    sent: 3,
    received: 4,
    activeChains: 5,
  };

  // Mock recent activity
  const recentActivity = [
    {
      type: 'sent',
      fileName: 'Family_Will_2024.pdf',
      to: '0x8a5c...2d4f',
      timestamp: '2 hours ago',
    },
    {
      type: 'received',
      fileName: 'Restaurant_Menu_Collection.pdf',
      from: '0x742d...0bEb',
      timestamp: '5 hours ago',
    },
    {
      type: 'sent',
      fileName: 'Property_Deed_Documents.pdf',
      to: '0x1a2b...9a0b',
      timestamp: '1 day ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-neutral-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Inheritances</p>
              <p className="mt-2 text-neutral-900">{stats.totalInheritances}</p>
            </div>
            <div className="rounded-lg bg-neutral-100 p-3">
              <FileText className="h-5 w-5 text-neutral-700" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-emerald-600">12%</span>
            <span className="text-neutral-500">from last month</span>
          </div>
        </Card>

        <Card className="border-neutral-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-600">Sent</p>
              <p className="mt-2 text-neutral-900">{stats.sent}</p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3">
              <Send className="h-5 w-5 text-blue-700" />
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500">
            Inheritances created
          </div>
        </Card>

        <Card className="border-neutral-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-600">Received</p>
              <p className="mt-2 text-neutral-900">{stats.received}</p>
            </div>
            <div className="rounded-lg bg-emerald-100 p-3">
              <Download className="h-5 w-5 text-emerald-700" />
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500">
            Available to download
          </div>
        </Card>

        <Card className="border-neutral-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-600">Active Chains</p>
              <p className="mt-2 text-neutral-900">{stats.activeChains}</p>
            </div>
            <div className="rounded-lg bg-purple-100 p-3">
              <svg className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500">
            Inheritance chains
          </div>
        </Card>
      </div>

      {/* Inheritance Graph */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-neutral-900">Inheritance Network</h2>
            <p className="text-sm text-neutral-600">
              Visualization of inheritance relationships and chain dependencies
            </p>
          </div>
          <Badge variant="outline" className="border-neutral-300">
            {stats.activeChains} chains
          </Badge>
        </div>
        <Card className="border-neutral-200 bg-white p-8">
          <InheritanceGraph />
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 text-neutral-900">Recent Activity</h2>
        <Card className="border-neutral-200 bg-white">
          <div className="divide-y divide-neutral-100">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-lg p-2 ${
                      activity.type === 'sent'
                        ? 'bg-blue-100'
                        : 'bg-emerald-100'
                    }`}
                  >
                    {activity.type === 'sent' ? (
                      <Send className="h-4 w-4 text-blue-700" />
                    ) : (
                      <Download className="h-4 w-4 text-emerald-700" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-neutral-900">
                        {activity.type === 'sent' ? 'Sent' : 'Received'}
                      </span>
                      <span className="text-neutral-400">·</span>
                      <span className="text-sm text-neutral-700">{activity.fileName}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-neutral-500">
                      <span>
                        {activity.type === 'sent' 
                          ? `To ${activity.to}`
                          : `From ${(activity as any).from}`
                        }
                      </span>
                      <span>·</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={
                      activity.type === 'sent'
                        ? 'border-blue-300 bg-blue-50 text-blue-700'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    }
                  >
                    {activity.type === 'sent' ? 'Sent' : 'Received'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
