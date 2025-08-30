import { refs } from "./js/refs";
import {toggelModal} from "./js/header"

refs.openMenuMobile.addEventListener('click', toggelModal);
refs.closeMenuMobile.addEventListener('click', toggelModal);
refs.bodyUnlock.addEventListener('click', () => {
	refs.bodyLock.classList.remove('lock');
	refs.modalMenuMobile.classList.remove('isActive');
});