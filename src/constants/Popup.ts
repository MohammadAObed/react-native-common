import type { PopupPressType } from '../types/components';

export const HideModes: Record<PopupPressType, string[]> = {
  Out: ['onAnyClick', 'onOutClick', 'onButtonOrOutClick', 'onCancelOrOutClick'],
  Cancel: [
    'onAnyClick',
    'onCancelClick',
    'onButtonOrCancelClick',
    'onCancelOrOutClick',
  ],
  Button: [
    'onAnyClick',
    'onButtonClick',
    'onButtonOrCancelClick',
    'onButtonOrOutClick',
  ],
};

export const ShadeLongPressTimeout = 500;
