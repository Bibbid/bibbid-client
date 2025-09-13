import type { ReactNode } from 'react';

export interface BottomSheetOverlayOptions {
  snapPoints?: string[];
}

export interface BottomSheetOverlayInstance {
  isOpen: boolean;
  close: () => void;
  expand: () => void;
  collapse: () => void;
}

type BottomSheetContent =
  | ReactNode
  | ((instance: BottomSheetOverlayInstance) => ReactNode);

class BottomSheetOverlayManager {
  private content: ReactNode | null = null;
  private options: BottomSheetOverlayOptions = {};
  private listeners: (() => void)[] = [];
  private isOpen = false;

  open(
    content: BottomSheetContent,
    options?: BottomSheetOverlayOptions
  ): BottomSheetOverlayInstance {
    this.isOpen = true;
    this.options = { ...this.options, ...options };

    if (typeof content === 'function') {
      this.content = content(this.createInstance());
    } else {
      this.content = content;
    }

    this.notifyListeners();
    return this.createInstance();
  }

  close() {
    this.isOpen = false;
    this.content = null;
    this.options = {};
    this.notifyListeners();
  }

  expand() {
    this.notifyListeners('expand');
  }

  collapse() {
    this.notifyListeners('collapse');
  }

  getContent() {
    return this.content;
  }

  getOptions() {
    return this.options;
  }

  getIsOpen() {
    return this.isOpen;
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private createInstance(): BottomSheetOverlayInstance {
    return {
      isOpen: this.isOpen,
      close: () => this.close(),
      expand: () => this.expand(),
      collapse: () => this.collapse(),
    };
  }

  private notifyListeners(action?: string) {
    this.listeners.forEach((listener) => listener());
  }
}

export const bottomSheetOverlay = new BottomSheetOverlayManager();
