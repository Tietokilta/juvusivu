import { en } from "./en";
import { fi } from "./fi";

en satisfies typeof fi;
fi satisfies typeof en;
