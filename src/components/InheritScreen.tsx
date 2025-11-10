import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Upload, 
  Loader2, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  X,
  Plus,
  Tag
} from 'lucide-react';

interface InheritScreenProps {
  walletAddress: string;
}

export function InheritScreen({ walletAddress }: InheritScreenProps) {
  const [step, setStep] = useState<'input' | 'processing' | 'complete'>('input');
  const [successorAddress, setSuccessorAddress] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [result, setResult] = useState({
    txHash: '',
    secretId: '',
    cid: '',
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    setStep('processing');

    // Simulate encryption and upload
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setResult({
      txHash: '0x' + Math.random().toString(16).substring(2, 66),
      secretId: 'inheritance-' + Date.now(),
      cid: 'bafybeig' + Math.random().toString(36).substring(2, 15),
    });

    setStep('complete');
  };

  const resetForm = () => {
    setStep('input');
    setSuccessorAddress('');
    setUploadedFile(null);
    setTags([]);
    setTagInput('');
    setResult({ txHash: '', secretId: '', cid: '' });
  };

  if (step === 'complete') {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="border-neutral-200 bg-white p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-700" />
            </div>
            <h2 className="mb-2 text-neutral-900">Inheritance Created Successfully</h2>
            <p className="text-neutral-600">
              Your data has been encrypted and the inheritance has been recorded on-chain
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <Label className="mb-2 block text-neutral-700">Inheritance ID</Label>
              <p className="text-sm text-neutral-900">{result.secretId}</p>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <Label className="mb-2 block text-neutral-700">IPFS CID</Label>
              <p className="break-all text-sm text-neutral-900">{result.cid}</p>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-neutral-700">Transaction Hash</Label>
                <a
                  href={`https://sepolia.arbiscan.io/tx/${result.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="break-all text-sm text-neutral-900">{result.txHash}</p>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <Label className="mb-2 block text-neutral-700">Recipient</Label>
              <p className="text-sm text-neutral-900">{successorAddress}</p>
            </div>

            {tags.length > 0 && (
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <Label className="mb-2 block text-neutral-700">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={resetForm} variant="outline" className="flex-1">
              Create Another
            </Button>
            <Button onClick={() => {}} className="flex-1">
              View Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="border-neutral-200 bg-white p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Loader2 className="h-8 w-8 animate-spin text-blue-700" />
            </div>
            <h2 className="mb-2 text-neutral-900">Processing Inheritance</h2>
            <p className="text-neutral-600">
              Encrypting data and recording on-chain...
            </p>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-neutral-700">Encrypting PDF with AES-GCM</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full border-2 border-neutral-300" />
                <span className="text-neutral-400">Uploading to IPFS</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full border-2 border-neutral-300" />
                <span className="text-neutral-400">Recording inheritance on-chain</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h2 className="mb-2 text-neutral-900">Create Inheritance</h2>
        <p className="text-neutral-600">
          Upload a PDF file and designate a successor wallet
        </p>
      </div>

      <Card className="border-neutral-200 bg-white p-8">
        <div className="mb-6 space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-sm text-blue-900">
              Your PDF will be encrypted client-side before being uploaded to IPFS. Only the designated successor will be able to decrypt and download it.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="successor-address" className="text-neutral-700">
              Successor Wallet Address
            </Label>
            <Input
              id="successor-address"
              placeholder="0x..."
              value={successorAddress}
              onChange={(e) => setSuccessorAddress(e.target.value)}
              className="mt-2"
            />
            <p className="mt-2 text-sm text-neutral-500">
              The wallet address that will inherit this data
            </p>
          </div>

          <div>
            <Label className="text-neutral-700">Upload PDF File</Label>
            {uploadedFile ? (
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <FileText className="h-8 w-8 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm text-neutral-900">{uploadedFile.name}</p>
                  <p className="text-sm text-neutral-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUploadedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="mt-2">
                <label
                  htmlFor="file-upload"
                  className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 transition-colors hover:border-neutral-400 hover:bg-neutral-100"
                >
                  <Upload className="mb-3 h-12 w-12 text-neutral-400" />
                  <p className="mb-1 text-sm text-neutral-700">Click to upload PDF</p>
                  <p className="text-sm text-neutral-500">PDF files only, up to 50MB</p>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div>
            <Label className="text-neutral-700">Tags (Optional)</Label>
            <div className="mt-2 flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  placeholder="Add a tag (e.g., menu, contract, will)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleAddTag} variant="outline" disabled={!tagInput.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="mt-2 text-sm text-neutral-500">
              Add tags to categorize and organize your inheritances
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleSubmit}
            disabled={!successorAddress || !uploadedFile}
            className="w-full"
          >
            Create Inheritance
          </Button>
        </div>
      </Card>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6">
        <h3 className="mb-3 text-neutral-900">How it works</h3>
        <ol className="space-y-2 text-sm text-neutral-600">
          <li className="flex gap-3">
            <Badge variant="outline" className="h-6 w-6 shrink-0 items-center justify-center rounded-full p-0">
              1
            </Badge>
            <span>Your PDF is encrypted locally with AES-GCM before leaving your browser</span>
          </li>
          <li className="flex gap-3">
            <Badge variant="outline" className="h-6 w-6 shrink-0 items-center justify-center rounded-full p-0">
              2
            </Badge>
            <span>The encrypted file is uploaded to IPFS for decentralized storage</span>
          </li>
          <li className="flex gap-3">
            <Badge variant="outline" className="h-6 w-6 shrink-0 items-center justify-center rounded-full p-0">
              3
            </Badge>
            <span>Inheritance record is created on-chain with the CID hash and recipient</span>
          </li>
          <li className="flex gap-3">
            <Badge variant="outline" className="h-6 w-6 shrink-0 items-center justify-center rounded-full p-0">
              4
            </Badge>
            <span>Only the designated successor can decrypt and download the file</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
