import { useState } from 'react';
import { Calculator, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryEntry {
  id: string;
  calculation: string;
}

function App() {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const getOperatorSymbol = (operator: '+' | '-' | '*' | '/'): string => {
    switch (operator) {
      case '+':
        return '+';
      case '-':
        return '−';
      case '*':
        return '×';
      case '/':
        return '÷';
    }
  };

  const calculate = (operator: '+' | '-' | '*' | '/') => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult('Please enter valid numbers');
      return;
    }

    let calculatedResult: number | string;
    let isSuccess = true;

    switch (operator) {
      case '+':
        calculatedResult = n1 + n2;
        break;
      case '-':
        calculatedResult = n1 - n2;
        break;
      case '*':
        calculatedResult = n1 * n2;
        break;
      case '/':
        if (n2 === 0) {
          calculatedResult = 'Cannot divide by zero';
          isSuccess = false;
        } else {
          calculatedResult = n1 / n2;
        }
        break;
    }

    setResult(`Result: ${calculatedResult}`);

    // Add to history only if calculation was successful
    if (isSuccess && typeof calculatedResult === 'number') {
      const operatorSymbol = getOperatorSymbol(operator);
      const historyEntry: HistoryEntry = {
        id: Date.now().toString(),
        calculation: `${n1} ${operatorSymbol} ${n2} = ${calculatedResult}`,
      };
      setHistory((prev) => [historyEntry, ...prev]);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Simple Calculator</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="w-full shadow-lg">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-center text-xl">Calculate</CardTitle>
              <p className="text-center text-sm text-muted-foreground">
                Enter two numbers and choose an operation
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="num1" className="text-sm font-medium">
                    First Number
                  </label>
                  <Input
                    id="num1"
                    type="number"
                    placeholder="Enter first number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="num2" className="text-sm font-medium">
                    Second Number
                  </label>
                  <Input
                    id="num2"
                    type="number"
                    placeholder="Enter second number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => calculate('+')}
                  variant="default"
                  size="lg"
                  className="h-14 text-base font-semibold"
                >
                  Add
                </Button>
                <Button
                  onClick={() => calculate('-')}
                  variant="default"
                  size="lg"
                  className="h-14 text-base font-semibold"
                >
                  Subtract
                </Button>
                <Button
                  onClick={() => calculate('*')}
                  variant="default"
                  size="lg"
                  className="h-14 text-base font-semibold"
                >
                  Multiply
                </Button>
                <Button
                  onClick={() => calculate('/')}
                  variant="default"
                  size="lg"
                  className="h-14 text-base font-semibold"
                >
                  Divide
                </Button>
              </div>

              {result && (
                <div className="rounded-lg bg-accent p-4 text-center">
                  <p className="text-lg font-bold text-accent-foreground">{result}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="w-full shadow-lg">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">History</CardTitle>
                {history.length > 0 && (
                  <Button
                    onClick={clearHistory}
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {history.length > 0
                  ? 'Your recent calculations'
                  : 'No calculations yet'}
              </p>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-muted-foreground text-center">
                    No calculation history yet.
                    <br />
                    Start calculating to see your history here.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-2">
                    {history.map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-lg bg-accent/50 px-4 py-3 transition-colors hover:bg-accent"
                      >
                        <p className="text-base font-medium text-accent-foreground">
                          {entry.calculation}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} · Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'calculator-app'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
