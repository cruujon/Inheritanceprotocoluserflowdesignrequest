import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { 
  Download, 
  FileText, 
  Search,
  ExternalLink,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface InheritanceData {
  id: string;
  fileName: string;
  from: string;
  receivedDate: string;
  fileSize: string;
  tags: string[];
  txHash: string;
  cid: string;
  status: 'available' | 'downloading';
}

interface ReceiveScreenProps {
  walletAddress: string;
}

export function ReceiveScreen({ walletAddress }: ReceiveScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Mock data - in production, this would be fetched based on walletAddress
  const inheritances: InheritanceData[] = [
    {
      id: 'inh-001',
      fileName: 'Family_Will_2024.pdf',
      from: '0x9f2a35Cc6634C0532925a3b844Bc9e7595f8c1b',
      receivedDate: '2024-11-09',
      fileSize: '2.4 MB',
      tags: ['will', 'legal'],
      txHash: '0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
      status: 'available',
    },
    {
      id: 'inh-002',
      fileName: 'Restaurant_Menu_Collection.pdf',
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      receivedDate: '2024-11-07',
      fileSize: '8.1 MB',
      tags: ['menu', 'restaurant'],
      txHash: '0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef',
      cid: 'bafybeihkoviema5eqxcfqt6w2dksxsasnxzwcgvuqzekn5u2hlhqpiyxuy',
      status: 'available',
    },
    {
      id: 'inh-003',
      fileName: 'Property_Deed_Documents.pdf',
      from: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      receivedDate: '2024-11-05',
      fileSize: '1.8 MB',
      tags: ['property', 'legal', 'deed'],
      txHash: '0x1111222233334444555566667777888899990000aaaabbbbccccddddeeeeffff',
      cid: 'bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq',
      status: 'available',
    },
    {
      id: 'inh-004',
      fileName: 'Investment_Portfolio_Summary.pdf',
      from: '0x8f7e6d5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b',
      receivedDate: '2024-11-03',
      fileSize: '3.2 MB',
      tags: ['finance', 'investment'],
      txHash: '0xaaaabbbbccccddddeeeeffffgggghhhhiiiijjjjkkkkllllmmmmnnnnoooopppp',
      cid: 'bafybeic2yq3w3yrh3qmdxgiwvgq67jvnqqxcvgbtghp4t4t5hxgf5w7f3a',
      status: 'available',
    },
  ];

  const filteredInheritances = inheritances.filter(
    (item) =>
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = async (inheritance: InheritanceData) => {
    setDownloadingId(inheritance.id);

    // Simulate decryption and download
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, this would decrypt and download the actual file
    console.log('Downloading:', inheritance.fileName);
    
    setDownloadingId(null);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h2 className="mb-2 text-neutral-900">Received Inheritances</h2>
        <p className="text-neutral-600">
          Files inherited by your wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
      </div>

      <Card className="border-neutral-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search by filename, tag, or sender..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-neutral-300">
              {filteredInheritances.length} {filteredInheritances.length === 1 ? 'file' : 'files'}
            </Badge>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50">
                <TableHead>File</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInheritances.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-neutral-500">
                    No inheritances found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInheritances.map((inheritance) => (
                  <TableRow key={inheritance.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-red-500" />
                        <span className="text-sm text-neutral-900">{inheritance.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-neutral-700">
                        {inheritance.from.slice(0, 6)}...{inheritance.from.slice(-4)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-neutral-700">{inheritance.receivedDate}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-neutral-700">{inheritance.fileSize}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {inheritance.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-blue-100 text-blue-700"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-emerald-300 bg-emerald-50 text-emerald-700"
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Available
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`https://ipfs.io/ipfs/${inheritance.cid}`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleDownload(inheritance)}
                          disabled={downloadingId === inheritance.id}
                        >
                          {downloadingId === inheritance.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Decrypting
                            </>
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6">
        <h3 className="mb-3 text-neutral-900">About downloads</h3>
        <div className="space-y-2 text-sm text-neutral-600">
          <div className="flex gap-3">
            <Badge variant="outline" className="h-6 w-6 shrink-0 items-center justify-center rounded-full p-0">
              1
            </Badge>
            <span>Files are verified on-chain to ensure they're intended for your wallet</span>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="h-6 w-6 shrink-0 items-center justify-center rounded-full p-0">
              2
            </Badge>
            <span>Decryption happens locally in your browser using your wallet's keys</span>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="h-6 w-6 shrink-0 items-center justify-center rounded-full p-0">
              3
            </Badge>
            <span>Original encrypted files remain on IPFS - only you can decrypt them</span>
          </div>
        </div>
      </div>
    </div>
  );
}
