import { t } from "i18next";
import { Modal, Button } from "neetoui";

const Alert = ({ isOpen, setIsOpen, title, action, buttonLabel }) => (
  <Modal
    className="p-4"
    isOpen={isOpen}
    size="medium"
    onClose={() => {
      setIsOpen(false);
    }}
  >
    <div className="flex h-full w-full flex-col">
      <h1 className="text-xl">{title}</h1>
      <p className="text-base">{t("misc.irreversibleAction")}</p>
      <div className="mr-4 mt-12 flex flex-row justify-end gap-x-4">
        <Button
          label={buttonLabel || t("buttonLabels.confirm")}
          size="small"
          style="danger"
          type="button"
          onClick={() => {
            action();
            setIsOpen(false);
          }}
        />
        <Button
          label={t("buttonLabels.cancel")}
          size="small"
          style="secondary"
          type="button"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  </Modal>
);

export default Alert;
