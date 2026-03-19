'use client';

type ModalConfirmacaoProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

export function ModalConfirmacao({
  open,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  description = "Tem certeza que deseja continuar?",
}: ModalConfirmacaoProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}