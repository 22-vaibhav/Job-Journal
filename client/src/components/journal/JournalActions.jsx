import { Save, Send } from "lucide-react";
import Button from "../ui/Button";

const JournalActions = ({ onSave, onSubmit }) => {
    return (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 pt-8 mt-2">
            <Button
                variant="secondary"
                className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-11"
                onClick={onSave}
            >
                <Save size={16} />
                Save Draft
            </Button>

            <Button
                variant="success"
                className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-11"
                onClick={onSubmit}
            >
                <Send size={16} />
                Submit Today
            </Button>
        </div>
    );
};

export default JournalActions;