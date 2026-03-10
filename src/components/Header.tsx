import { Banknote, AlertTriangle } from "lucide-react";

export function Header() {
  return (
    <>
      <div className="w-full bg-green-100 border-b border-green-300 py-2.5 px-4">
        <div className="container">
          <p className="text-xs sm:text-sm text-black flex items-start gap-2 leading-relaxed">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <strong>Important:</strong> We've been made aware of fraudulent websites impersonating M-KOPA. Be advised that this website is the only official M-KOPA website. For payments to M-KOPA Kenya use our official MPESA Number and support, call <strong>+254 052 82669</strong>
            </span>
          </p>
        </div>
      </div>
      <header className="w-full py-4 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
              <Banknote className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
              M-KOPA <span className="text-primary">Loans</span>
            </h1>
          </div>
        </div>
      </header>
    </>
  );
}
