/**
 * @license Angular v19.2.0-next.1
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */


import { BehaviorSubject } from 'rxjs';
import { EnvironmentProviders as EnvironmentProviders_2 } from '@angular/core';
import { EventContract } from '@angular/core/primitives/event-dispatch';
import { Observable } from 'rxjs';
import { ReactiveNode } from '@angular/core/primitives/signals';
import { SignalNode } from '@angular/core/primitives/signals';
import { Subject } from 'rxjs';
import { Subscribable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ValueEqualityFn as ValueEqualityFn_2 } from '@angular/core/primitives/signals';
import { ɵProfiler as ɵProfiler_2 } from '@angular/core';
import { SIGNAL as ɵSIGNAL } from '@angular/core/primitives/signals';

/**
 * @description
 *
 * Represents an abstract class `T`, if applied to a concrete class it would stop being
 * instantiable.
 *
 * @publicApi
 */
export declare interface AbstractType<T> extends Function {
    prototype: T;
}

/**
 * @description
 * A lifecycle hook that is called after the default change detector has
 * completed checking all content of a directive. It will run after the content
 * has been checked and most of the time it's during a change detection cycle.
 *
 * @see {@link AfterViewChecked}
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 * @publicApi
 */
export declare interface AfterContentChecked {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has completed checking all of the directive's
     * content.
     */
    ngAfterContentChecked(): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has fully initialized
 * all content of a directive. It will run only once when the projected content is initialized.
 * Define an `ngAfterContentInit()` method to handle any additional initialization tasks.
 *
 * @see {@link OnInit}
 * @see {@link AfterViewInit}
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own content initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 * @publicApi
 */
export declare interface AfterContentInit {
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of all of the directive's
     * content.
     * It is invoked only once when the directive is instantiated.
     */
    ngAfterContentInit(): void;
}

/**
 * Register callbacks to be invoked the next time the application finishes rendering, during the
 * specified phases. The available phases are:
 * - `earlyRead`
 *   Use this phase to **read** from the DOM before a subsequent `write` callback, for example to
 *   perform custom layout that the browser doesn't natively support. Prefer the `read` phase if
 *   reading can wait until after the write phase. **Never** write to the DOM in this phase.
 * - `write`
 *    Use this phase to **write** to the DOM. **Never** read from the DOM in this phase.
 * - `mixedReadWrite`
 *    Use this phase to read from and write to the DOM simultaneously. **Never** use this phase if
 *    it is possible to divide the work among the other phases instead.
 * - `read`
 *    Use this phase to **read** from the DOM. **Never** write to the DOM in this phase.
 *
 * <div class="docs-alert docs-alert-critical">
 *
 * You should prefer using the `read` and `write` phases over the `earlyRead` and `mixedReadWrite`
 * phases when possible, to avoid performance degradation.
 *
 * </div>
 *
 * Note that:
 * - Callbacks run in the following phase order *once, after the next render*:
 *   1. `earlyRead`
 *   2. `write`
 *   3. `mixedReadWrite`
 *   4. `read`
 * - Callbacks in the same phase run in the order they are registered.
 * - Callbacks run on browser platforms only, they will not run on the server.
 *
 * The first phase callback to run as part of this spec will receive no parameters. Each
 * subsequent phase callback in this spec will receive the return value of the previously run
 * phase callback as a parameter. This can be used to coordinate work across multiple phases.
 *
 * Angular is unable to verify or enforce that phases are used correctly, and instead
 * relies on each developer to follow the guidelines documented for each value and
 * carefully choose the appropriate one, refactoring their code if necessary. By doing
 * so, Angular is better able to minimize the performance degradation associated with
 * manual DOM access, ensuring the best experience for the end users of your application
 * or library.
 *
 * <div class="docs-alert docs-alert-important">
 *
 * Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
 * You must use caution when directly reading or writing the DOM and layout.
 *
 * </div>
 *
 * @param spec The callback functions to register
 * @param options Options to control the behavior of the callback
 *
 * @usageNotes
 *
 * Use `afterNextRender` to read or write the DOM once,
 * for example to initialize a non-Angular library.
 *
 * ### Example
 * ```angular-ts
 * @Component({
 *   selector: 'my-chart-cmp',
 *   template: `<div #chart>{{ ... }}</div>`,
 * })
 * export class MyChartCmp {
 *   @ViewChild('chart') chartRef: ElementRef;
 *   chart: MyChart|null;
 *
 *   constructor() {
 *     afterNextRender({
 *       write: () => {
 *         this.chart = new MyChart(this.chartRef.nativeElement);
 *       }
 *     });
 *   }
 * }
 * ```
 *
 * @developerPreview
 */
export declare function afterNextRender<E = never, W = never, M = never>(spec: {
    earlyRead?: () => E;
    write?: (...args: ɵFirstAvailable<[E]>) => W;
    mixedReadWrite?: (...args: ɵFirstAvailable<[W, E]>) => M;
    read?: (...args: ɵFirstAvailable<[M, W, E]>) => void;
}, options?: Omit<AfterRenderOptions, 'phase'>): AfterRenderRef;

/**
 * Register a callback to be invoked the next time the application finishes rendering, during the
 * `mixedReadWrite` phase.
 *
 * <div class="docs-alert docs-alert-critical">
 *
 * You should prefer specifying an explicit phase for the callback instead, or you risk significant
 * performance degradation.
 *
 * </div>
 *
 * Note that the callback will run
 * - in the order it was registered
 * - on browser platforms only
 * - during the `mixedReadWrite` phase
 *
 * <div class="docs-alert docs-alert-important">
 *
 * Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
 * You must use caution when directly reading or writing the DOM and layout.
 *
 * </div>
 *
 * @param callback A callback function to register
 * @param options Options to control the behavior of the callback
 *
 * @usageNotes
 *
 * Use `afterNextRender` to read or write the DOM once,
 * for example to initialize a non-Angular library.
 *
 * ### Example
 * ```angular-ts
 * @Component({
 *   selector: 'my-chart-cmp',
 *   template: `<div #chart>{{ ... }}</div>`,
 * })
 * export class MyChartCmp {
 *   @ViewChild('chart') chartRef: ElementRef;
 *   chart: MyChart|null;
 *
 *   constructor() {
 *     afterNextRender({
 *       write: () => {
 *         this.chart = new MyChart(this.chartRef.nativeElement);
 *       }
 *     });
 *   }
 * }
 * ```
 *
 * @developerPreview
 */
export declare function afterNextRender(callback: VoidFunction, options?: AfterRenderOptions): AfterRenderRef;

/**
 * Register callbacks to be invoked each time the application finishes rendering, during the
 * specified phases. The available phases are:
 * - `earlyRead`
 *   Use this phase to **read** from the DOM before a subsequent `write` callback, for example to
 *   perform custom layout that the browser doesn't natively support. Prefer the `read` phase if
 *   reading can wait until after the write phase. **Never** write to the DOM in this phase.
 * - `write`
 *    Use this phase to **write** to the DOM. **Never** read from the DOM in this phase.
 * - `mixedReadWrite`
 *    Use this phase to read from and write to the DOM simultaneously. **Never** use this phase if
 *    it is possible to divide the work among the other phases instead.
 * - `read`
 *    Use this phase to **read** from the DOM. **Never** write to the DOM in this phase.
 *
 * <div class="docs-alert docs-alert-critical">
 *
 * You should prefer using the `read` and `write` phases over the `earlyRead` and `mixedReadWrite`
 * phases when possible, to avoid performance degradation.
 *
 * </div>
 *
 * Note that:
 * - Callbacks run in the following phase order *after each render*:
 *   1. `earlyRead`
 *   2. `write`
 *   3. `mixedReadWrite`
 *   4. `read`
 * - Callbacks in the same phase run in the order they are registered.
 * - Callbacks run on browser platforms only, they will not run on the server.
 *
 * The first phase callback to run as part of this spec will receive no parameters. Each
 * subsequent phase callback in this spec will receive the return value of the previously run
 * phase callback as a parameter. This can be used to coordinate work across multiple phases.
 *
 * Angular is unable to verify or enforce that phases are used correctly, and instead
 * relies on each developer to follow the guidelines documented for each value and
 * carefully choose the appropriate one, refactoring their code if necessary. By doing
 * so, Angular is better able to minimize the performance degradation associated with
 * manual DOM access, ensuring the best experience for the end users of your application
 * or library.
 *
 * <div class="docs-alert docs-alert-important">
 *
 * Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
 * You must use caution when directly reading or writing the DOM and layout.
 *
 * </div>
 *
 * @param spec The callback functions to register
 * @param options Options to control the behavior of the callback
 *
 * @usageNotes
 *
 * Use `afterRender` to read or write the DOM after each render.
 *
 * ### Example
 * ```angular-ts
 * @Component({
 *   selector: 'my-cmp',
 *   template: `<span #content>{{ ... }}</span>`,
 * })
 * export class MyComponent {
 *   @ViewChild('content') contentRef: ElementRef;
 *
 *   constructor() {
 *     afterRender({
 *       read: () => {
 *         console.log('content height: ' + this.contentRef.nativeElement.scrollHeight);
 *       }
 *     });
 *   }
 * }
 * ```
 *
 * @developerPreview
 */
export declare function afterRender<E = never, W = never, M = never>(spec: {
    earlyRead?: () => E;
    write?: (...args: ɵFirstAvailable<[E]>) => W;
    mixedReadWrite?: (...args: ɵFirstAvailable<[W, E]>) => M;
    read?: (...args: ɵFirstAvailable<[M, W, E]>) => void;
}, options?: Omit<AfterRenderOptions, 'phase'>): AfterRenderRef;

/**
 * Register a callback to be invoked each time the application finishes rendering, during the
 * `mixedReadWrite` phase.
 *
 * <div class="docs-alert docs-alert-critical">
 *
 * You should prefer specifying an explicit phase for the callback instead, or you risk significant
 * performance degradation.
 *
 * </div>
 *
 * Note that the callback will run
 * - in the order it was registered
 * - once per render
 * - on browser platforms only
 * - during the `mixedReadWrite` phase
 *
 * <div class="docs-alert docs-alert-important">
 *
 * Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
 * You must use caution when directly reading or writing the DOM and layout.
 *
 * </div>
 *
 * @param callback A callback function to register
 * @param options Options to control the behavior of the callback
 *
 * @usageNotes
 *
 * Use `afterRender` to read or write the DOM after each render.
 *
 * ### Example
 * ```angular-ts
 * @Component({
 *   selector: 'my-cmp',
 *   template: `<span #content>{{ ... }}</span>`,
 * })
 * export class MyComponent {
 *   @ViewChild('content') contentRef: ElementRef;
 *
 *   constructor() {
 *     afterRender({
 *       read: () => {
 *         console.log('content height: ' + this.contentRef.nativeElement.scrollHeight);
 *       }
 *     });
 *   }
 * }
 * ```
 *
 * @developerPreview
 */
export declare function afterRender(callback: VoidFunction, options?: AfterRenderOptions): AfterRenderRef;

/**
 * Register an effect that, when triggered, is invoked when the application finishes rendering, during the
 * `mixedReadWrite` phase.
 *
 * <div class="docs-alert docs-alert-critical">
 *
 * You should prefer specifying an explicit phase for the effect instead, or you risk significant
 * performance degradation.
 *
 * </div>
 *
 * Note that callback-based `afterRenderEffect`s will run
 * - in the order it they are registered
 * - only when dirty
 * - on browser platforms only
 * - during the `mixedReadWrite` phase
 *
 * <div class="docs-alert docs-alert-important">
 *
 * Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
 * You must use caution when directly reading or writing the DOM and layout.
 *
 * </div>
 *
 * @param callback An effect callback function to register
 * @param options Options to control the behavior of the callback
 *
 * @experimental
 */
export declare function afterRenderEffect(callback: (onCleanup: EffectCleanupRegisterFn) => void, options?: Omit<AfterRenderOptions, 'phase'>): AfterRenderRef;

/**
 * Register effects that, when triggered, are invoked when the application finishes rendering,
 * during the specified phases. The available phases are:
 * - `earlyRead`
 *   Use this phase to **read** from the DOM before a subsequent `write` callback, for example to
 *   perform custom layout that the browser doesn't natively support. Prefer the `read` phase if
 *   reading can wait until after the write phase. **Never** write to the DOM in this phase.
 * - `write`
 *    Use this phase to **write** to the DOM. **Never** read from the DOM in this phase.
 * - `mixedReadWrite`
 *    Use this phase to read from and write to the DOM simultaneously. **Never** use this phase if
 *    it is possible to divide the work among the other phases instead.
 * - `read`
 *    Use this phase to **read** from the DOM. **Never** write to the DOM in this phase.
 *
 * <div class="docs-alert docs-alert-critical">
 *
 * You should prefer using the `read` and `write` phases over the `earlyRead` and `mixedReadWrite`
 * phases when possible, to avoid performance degradation.
 *
 * </div>
 *
 * Note that:
 * - Effects run in the following phase order, only when dirty through signal dependencies:
 *   1. `earlyRead`
 *   2. `write`
 *   3. `mixedReadWrite`
 *   4. `read`
 * - `afterRenderEffect`s in the same phase run in the order they are registered.
 * - `afterRenderEffect`s run on browser platforms only, they will not run on the server.
 * - `afterRenderEffect`s will run at least once.
 *
 * The first phase callback to run as part of this spec will receive no parameters. Each
 * subsequent phase callback in this spec will receive the return value of the previously run
 * phase callback as a `Signal`. This can be used to coordinate work across multiple phases.
 *
 * Angular is unable to verify or enforce that phases are used correctly, and instead
 * relies on each developer to follow the guidelines documented for each value and
 * carefully choose the appropriate one, refactoring their code if necessary. By doing
 * so, Angular is better able to minimize the performance degradation associated with
 * manual DOM access, ensuring the best experience for the end users of your application
 * or library.
 *
 * <div class="docs-alert docs-alert-important">
 *
 * Components are not guaranteed to be [hydrated](guide/hydration) before the callback runs.
 * You must use caution when directly reading or writing the DOM and layout.
 *
 * </div>
 *
 * @param spec The effect functions to register
 * @param options Options to control the behavior of the effects
 *
 * @usageNotes
 *
 * Use `afterRenderEffect` to create effects that will read or write from the DOM and thus should
 * run after rendering.
 *
 * @experimental
 */
export declare function afterRenderEffect<E = never, W = never, M = never>(spec: {
    earlyRead?: (onCleanup: EffectCleanupRegisterFn) => E;
    write?: (...args: [...ɵFirstAvailableSignal<[E]>, EffectCleanupRegisterFn]) => W;
    mixedReadWrite?: (...args: [...ɵFirstAvailableSignal<[W, E]>, EffectCleanupRegisterFn]) => M;
    read?: (...args: [...ɵFirstAvailableSignal<[M, W, E]>, EffectCleanupRegisterFn]) => void;
}, options?: Omit<AfterRenderOptions, 'phase'>): AfterRenderRef;

declare type AfterRenderHook = (value?: unknown) => unknown;

declare type AfterRenderHooks = [
AfterRenderHook | undefined,
AfterRenderHook | undefined,
AfterRenderHook | undefined,
AfterRenderHook | undefined
];

declare class AfterRenderImpl {
    private readonly ngZone;
    private readonly scheduler;
    private readonly errorHandler;
    /** Current set of active sequences. */
    private readonly sequences;
    /** Tracks registrations made during the current set of executions. */
    private readonly deferredRegistrations;
    /** Whether the `AfterRenderManager` is currently executing hooks. */
    executing: boolean;
    constructor();
    /**
     * Run the sequence of phases of hooks, once through. As a result of executing some hooks, more
     * might be scheduled.
     */
    execute(): void;
    register(sequence: AfterRenderSequence): void;
    unregister(sequence: AfterRenderSequence): void;
    protected maybeTrace<T>(fn: () => T, snapshot: ɵTracingSnapshot | null): T;
    /** @nocollapse */
    static ɵprov: unknown;
}

/**
 * Options passed to `afterRender` and `afterNextRender`.
 *
 * @developerPreview
 */
export declare interface AfterRenderOptions {
    /**
     * The `Injector` to use during creation.
     *
     * If this is not provided, the current injection context will be used instead (via `inject`).
     */
    injector?: Injector;
    /**
     * Whether the hook should require manual cleanup.
     *
     * If this is `false` (the default) the hook will automatically register itself to be cleaned up
     * with the current `DestroyRef`.
     */
    manualCleanup?: boolean;
    /**
     * The phase the callback should be invoked in.
     *
     * <div class="docs-alert docs-alert-critical">
     *
     * Defaults to `AfterRenderPhase.MixedReadWrite`. You should choose a more specific
     * phase instead. See `AfterRenderPhase` for more information.
     *
     * </div>
     *
     * @deprecated Specify the phase for your callback to run in by passing a spec-object as the first
     *   parameter to `afterRender` or `afterNextRender` instead of a function.
     */
    phase?: AfterRenderPhase;
}


/**
 * The phase to run an `afterRender` or `afterNextRender` callback in.
 *
 * Callbacks in the same phase run in the order they are registered. Phases run in the
 * following order after each render:
 *
 *   1. `AfterRenderPhase.EarlyRead`
 *   2. `AfterRenderPhase.Write`
 *   3. `AfterRenderPhase.MixedReadWrite`
 *   4. `AfterRenderPhase.Read`
 *
 * Angular is unable to verify or enforce that phases are used correctly, and instead
 * relies on each developer to follow the guidelines documented for each value and
 * carefully choose the appropriate one, refactoring their code if necessary. By doing
 * so, Angular is better able to minimize the performance degradation associated with
 * manual DOM access, ensuring the best experience for the end users of your application
 * or library.
 *
 * @deprecated Specify the phase for your callback to run in by passing a spec-object as the first
 *   parameter to `afterRender` or `afterNextRender` instead of a function.
 */
export declare enum AfterRenderPhase {
    /**
     * Use `AfterRenderPhase.EarlyRead` for callbacks that only need to **read** from the
     * DOM before a subsequent `AfterRenderPhase.Write` callback, for example to perform
     * custom layout that the browser doesn't natively support. Prefer the
     * `AfterRenderPhase.EarlyRead` phase if reading can wait until after the write phase.
     * **Never** write to the DOM in this phase.
     *
     * <div class="docs-alert docs-alert-important">
     *
     * Using this value can degrade performance.
     * Instead, prefer using built-in browser functionality when possible.
     *
     * </div>
     */
    EarlyRead = 0,
    /**
     * Use `AfterRenderPhase.Write` for callbacks that only **write** to the DOM. **Never**
     * read from the DOM in this phase.
     */
    Write = 1,
    /**
     * Use `AfterRenderPhase.MixedReadWrite` for callbacks that read from or write to the
     * DOM, that haven't been refactored to use a different phase. **Never** use this phase if
     * it is possible to divide the work among the other phases instead.
     *
     * <div class="docs-alert docs-alert-critical">
     *
     * Using this value can **significantly** degrade performance.
     * Instead, prefer dividing work into the appropriate phase callbacks.
     *
     * </div>
     */
    MixedReadWrite = 2,
    /**
     * Use `AfterRenderPhase.Read` for callbacks that only **read** from the DOM. **Never**
     * write to the DOM in this phase.
     */
    Read = 3
}

/**
 * A callback that runs after render.
 *
 * @developerPreview
 */
export declare interface AfterRenderRef {
    /**
     * Shut down the callback, preventing it from being called again.
     */
    destroy(): void;
}

declare class AfterRenderSequence implements AfterRenderRef {
    readonly impl: AfterRenderImpl;
    readonly hooks: AfterRenderHooks;
    once: boolean;
    snapshot: ɵTracingSnapshot | null;
    /**
     * Whether this sequence errored or was destroyed during this execution, and hooks should no
     * longer run for it.
     */
    erroredOrDestroyed: boolean;
    /**
     * The value returned by the last hook execution (if any), ready to be pipelined into the next
     * one.
     */
    pipelinedValue: unknown;
    private unregisterOnDestroy;
    constructor(impl: AfterRenderImpl, hooks: AfterRenderHooks, once: boolean, destroyRef: DestroyRef | null, snapshot?: ɵTracingSnapshot | null);
    afterRun(): void;
    destroy(): void;
}

/**
 * @description
 * A lifecycle hook that is called after the default change detector has
 * completed checking a component's view for changes.
 *
 * @see {@link AfterContentChecked}
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * @publicApi
 */
export declare interface AfterViewChecked {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has completed one change-check cycle
     * for a component's view.
     */
    ngAfterViewChecked(): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has fully initialized
 * a component's view.
 * Define an `ngAfterViewInit()` method to handle any additional initialization tasks.
 *
 * @see {@link OnInit}
 * @see {@link AfterContentInit}
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own view initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 * @publicApi
 */
export declare interface AfterViewInit {
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of a component's view.
     * It is invoked only once when the view is instantiated.
     *
     */
    ngAfterViewInit(): void;
}

/**
 * A [DI token](api/core/InjectionToken) that indicates which animations
 * module has been loaded.
 * @publicApi
 */
export declare const ANIMATION_MODULE_TYPE: InjectionToken<"NoopAnimations" | "BrowserAnimations">;

/**
 * A DI token that provides a set of callbacks to
 * be called for every component that is bootstrapped.
 *
 * Each callback must take a `ComponentRef` instance and return nothing.
 *
 * `(componentRef: ComponentRef) => void`
 *
 * @publicApi
 */
export declare const APP_BOOTSTRAP_LISTENER: InjectionToken<readonly ((compRef: ComponentRef<any>) => void)[]>;

/**
 * A DI token representing a string ID, used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * The token is needed in cases when multiple applications are bootstrapped on a page
 * (for example, using `bootstrapApplication` calls). In this case, ensure that those applications
 * have different `APP_ID` value setup. For example:
 *
 * ```ts
 * bootstrapApplication(ComponentA, {
 *   providers: [
 *     { provide: APP_ID, useValue: 'app-a' },
 *     // ... other providers ...
 *   ]
 * });
 *
 * bootstrapApplication(ComponentB, {
 *   providers: [
 *     { provide: APP_ID, useValue: 'app-b' },
 *     // ... other providers ...
 *   ]
 * });
 * ```
 *
 * By default, when there is only one application bootstrapped, you don't need to provide the
 * `APP_ID` token (the `ng` will be used as an app ID).
 *
 * @publicApi
 */
export declare const APP_ID: InjectionToken<string>;

/**
 * A DI token that you can use to provide
 * one or more initialization functions.
 *
 * The provided functions are injected at application startup and executed during
 * app initialization. If any of these functions returns a Promise or an Observable, initialization
 * does not complete until the Promise is resolved or the Observable is completed.
 *
 * You can, for example, create a factory function that loads language data
 * or an external configuration, and provide that function to the `APP_INITIALIZER` token.
 * The function is executed during the application bootstrap process,
 * and the needed data is available on startup.
 *
 * Note that the provided initializer is run in the injection context.
 *
 * @deprecated from v19.0.0, use provideAppInitializer instead
 *
 * @see {@link ApplicationInitStatus}
 * @see {@link provideAppInitializer}
 *
 * @usageNotes
 *
 * The following example illustrates how to configure a multi-provider using `APP_INITIALIZER` token
 * and a function returning a promise.
 * ### Example with NgModule-based application
 * ```ts
 *  function initializeApp(): Promise<any> {
 *    const http = inject(HttpClient);
 *    return firstValueFrom(
 *      http
 *        .get("https://someUrl.com/api/user")
 *        .pipe(tap(user => { ... }))
 *    );
 *  }
 *
 *  @NgModule({
 *   imports: [BrowserModule],
 *   declarations: [AppComponent],
 *   bootstrap: [AppComponent],
 *   providers: [{
 *     provide: APP_INITIALIZER,
 *     useValue: initializeApp,
 *     multi: true,
 *    }]
 *   })
 *  export class AppModule {}
 * ```
 *
 * ### Example with standalone application
 * ```ts
 * function initializeApp() {
 *   const http = inject(HttpClient);
 *   return firstValueFrom(
 *     http
 *       .get("https://someUrl.com/api/user")
 *       .pipe(tap(user => { ... }))
 *   );
 * }
 *
 * bootstrapApplication(App, {
 *   providers: [
 *     provideHttpClient(),
 *     {
 *       provide: APP_INITIALIZER,
 *       useValue: initializeApp,
 *       multi: true,
 *     },
 *   ],
 * });

 * ```
 *
 *
 * It's also possible to configure a multi-provider using `APP_INITIALIZER` token and a function
 * returning an observable, see an example below. Note: the `HttpClient` in this example is used for
 * demo purposes to illustrate how the factory function can work with other providers available
 * through DI.
 *
 * ### Example with NgModule-based application
 * ```ts
 * function initializeApp() {
 *   const http = inject(HttpClient);
 *   return firstValueFrom(
 *     http
 *       .get("https://someUrl.com/api/user")
 *       .pipe(tap(user => { ... }))
 *   );
 * }
 *
 * @NgModule({
 *   imports: [BrowserModule, HttpClientModule],
 *   declarations: [AppComponent],
 *   bootstrap: [AppComponent],
 *   providers: [{
 *     provide: APP_INITIALIZER,
 *     useValue: initializeApp,
 *     multi: true,
 *   }]
 * })
 * export class AppModule {}
 * ```
 *
 * ### Example with standalone application
 * ```ts
 * function initializeApp() {
 *   const http = inject(HttpClient);
 *   return firstValueFrom(
 *     http
 *       .get("https://someUrl.com/api/user")
 *       .pipe(tap(user => { ... }))
 *   );
 * }
 *
 * bootstrapApplication(App, {
 *   providers: [
 *     provideHttpClient(),
 *     {
 *       provide: APP_INITIALIZER,
 *       useValue: initializeApp,
 *       multi: true,
 *     },
 *   ],
 * });
 * ```
 *
 * @publicApi
 */
export declare const APP_INITIALIZER: InjectionToken<readonly (() => Observable<unknown> | Promise<unknown> | void)[]>;

/**
 * Set of config options available during the application bootstrap operation.
 *
 * @publicApi
 */
export declare interface ApplicationConfig {
    /**
     * List of providers that should be available to the root component and all its children.
     */
    providers: Array<Provider | EnvironmentProviders>;
}

/**
 * A class that reflects the state of running {@link APP_INITIALIZER} functions.
 *
 * @publicApi
 */
export declare class ApplicationInitStatus {
    private resolve;
    private reject;
    private initialized;
    readonly done = false;
    readonly donePromise: Promise<any>;
    private readonly appInits;
    private readonly injector;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplicationInitStatus, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ApplicationInitStatus>;
}

/**
 * Re-exported by `BrowserModule`, which is included automatically in the root
 * `AppModule` when you create a new app with the CLI `new` command. Eagerly injects
 * `ApplicationRef` to instantiate it.
 *
 * @publicApi
 */
export declare class ApplicationModule {
    constructor(appRef: ApplicationRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplicationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ApplicationModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ApplicationModule>;
}

/**
 * A reference to an Angular application running on a page.
 *
 * @usageNotes
 * {@a is-stable-examples}
 * ### isStable examples and caveats
 *
 * Note two important points about `isStable`, demonstrated in the examples below:
 * - the application will never be stable if you start any kind
 * of recurrent asynchronous task when the application starts
 * (for example for a polling process, started with a `setInterval`, a `setTimeout`
 * or using RxJS operators like `interval`);
 * - the `isStable` Observable runs outside of the Angular zone.
 *
 * Let's imagine that you start a recurrent task
 * (here incrementing a counter, using RxJS `interval`),
 * and at the same time subscribe to `isStable`.
 *
 * ```ts
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *      filter(stable => stable)
 *   ).subscribe(() => console.log('App is stable now');
 *   interval(1000).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, `isStable` will never emit `true`,
 * and the trace "App is stable now" will never get logged.
 *
 * If you want to execute something when the app is stable,
 * you have to wait for the application to be stable
 * before starting your polling process.
 *
 * ```ts
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     tap(stable => console.log('App is stable now')),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, the trace "App is stable now" will be logged
 * and then the counter starts incrementing every second.
 *
 * Note also that this Observable runs outside of the Angular zone,
 * which means that the code in the subscription
 * to this Observable will not trigger the change detection.
 *
 * Let's imagine that instead of logging the counter value,
 * you update a field of your component
 * and display it in its template.
 *
 * ```ts
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => this.value = counter);
 * }
 * ```
 * As the `isStable` Observable runs outside the zone,
 * the `value` field will be updated properly,
 * but the template will not be refreshed!
 *
 * You'll have to manually trigger the change detection to update the template.
 *
 * ```ts
 * constructor(appRef: ApplicationRef, cd: ChangeDetectorRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => {
 *     this.value = counter;
 *     cd.detectChanges();
 *   });
 * }
 * ```
 *
 * Or make the subscription callback run inside the zone.
 *
 * ```ts
 * constructor(appRef: ApplicationRef, zone: NgZone) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => zone.run(() => this.value = counter));
 * }
 * ```
 *
 * @publicApi
 */
export declare class ApplicationRef {
    private _destroyed;
    private _destroyListeners;
    private readonly internalErrorHandler;
    private readonly afterRenderManager;
    private readonly zonelessEnabled;
    private readonly rootEffectScheduler;
    private externalTestViews;
    /**
     * Indicates whether this instance was destroyed.
     */
    get destroyed(): boolean;
    /**
     * Get a list of component types registered to this application.
     * This list is populated even before the component is created.
     */
    readonly componentTypes: Type<any>[];
    /**
     * Get a list of components registered to this application.
     */
    readonly components: ComponentRef<any>[];
    /**
     * Returns an Observable that indicates when the application is stable or unstable.
     */
    readonly isStable: Observable<boolean>;
    constructor();
    /**
     * @returns A promise that resolves when the application becomes stable
     */
    whenStable(): Promise<void>;
    private readonly _injector;
    private _rendererFactory;
    /**
     * The `EnvironmentInjector` used to create this application.
     */
    get injector(): EnvironmentInjector;
    /**
     * Bootstrap a component onto the element identified by its selector or, optionally, to a
     * specified element.
     *
     * @usageNotes
     * ### Bootstrap process
     *
     * When bootstrapping a component, Angular mounts it onto a target DOM element
     * and kicks off automatic change detection. The target DOM element can be
     * provided using the `rootSelectorOrNode` argument.
     *
     * If the target DOM element is not provided, Angular tries to find one on a page
     * using the `selector` of the component that is being bootstrapped
     * (first matched element is used).
     *
     * ### Example
     *
     * Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
     * but it requires us to know the component while writing the application code.
     *
     * Imagine a situation where we have to wait for an API call to decide about the component to
     * bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
     * dynamically bootstrap a component.
     *
     * {@example core/ts/platform/platform.ts region='componentSelector'}
     *
     * Optionally, a component can be mounted onto a DOM element that does not match the
     * selector of the bootstrapped component.
     *
     * In the following example, we are providing a CSS selector to match the target element.
     *
     * {@example core/ts/platform/platform.ts region='cssSelector'}
     *
     * While in this example, we are providing reference to a DOM node.
     *
     * {@example core/ts/platform/platform.ts region='domNode'}
     */
    bootstrap<C>(component: Type<C>, rootSelectorOrNode?: string | any): ComponentRef<C>;
    /**
     * Bootstrap a component onto the element identified by its selector or, optionally, to a
     * specified element.
     *
     * @usageNotes
     * ### Bootstrap process
     *
     * When bootstrapping a component, Angular mounts it onto a target DOM element
     * and kicks off automatic change detection. The target DOM element can be
     * provided using the `rootSelectorOrNode` argument.
     *
     * If the target DOM element is not provided, Angular tries to find one on a page
     * using the `selector` of the component that is being bootstrapped
     * (first matched element is used).
     *
     * ### Example
     *
     * Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
     * but it requires us to know the component while writing the application code.
     *
     * Imagine a situation where we have to wait for an API call to decide about the component to
     * bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
     * dynamically bootstrap a component.
     *
     * {@example core/ts/platform/platform.ts region='componentSelector'}
     *
     * Optionally, a component can be mounted onto a DOM element that does not match the
     * selector of the bootstrapped component.
     *
     * In the following example, we are providing a CSS selector to match the target element.
     *
     * {@example core/ts/platform/platform.ts region='cssSelector'}
     *
     * While in this example, we are providing reference to a DOM node.
     *
     * {@example core/ts/platform/platform.ts region='domNode'}
     *
     * @deprecated Passing Component factories as the `Application.bootstrap` function argument is
     *     deprecated. Pass Component Types instead.
     */
    bootstrap<C>(componentFactory: ComponentFactory<C>, rootSelectorOrNode?: string | any): ComponentRef<C>;
    /**
     * Invoke this method to explicitly process change detection and its side-effects.
     *
     * In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further changes are detected. If additional changes are picked up during this second cycle,
     * bindings in the app have side-effects that cannot be resolved in a single change detection
     * pass.
     * In this case, Angular throws an error, since an Angular application can only have one change
     * detection pass during which all change detection must complete.
     */
    tick(): void;
    private tickImpl;
    /**
     * Performs the core work of synchronizing the application state with the UI, resolving any
     * pending dirtiness (potentially in a loop).
     */
    private synchronize;
    /**
     * Perform a single synchronization pass.
     */
    private synchronizeOnce;
    /**
     * Checks `allViews` for views which require refresh/traversal, and updates `dirtyFlags`
     * accordingly, with two potential behaviors:
     *
     * 1. If any of our views require updating, then this adds the `ViewTreeTraversal` dirty flag.
     *    This _should_ be a no-op, since the scheduler should've added the flag at the same time the
     *    view was marked as needing updating.
     *
     *    TODO(alxhub): figure out if this behavior is still needed for edge cases.
     *
     * 2. If none of our views require updating, then clear the view-related `dirtyFlag`s. This
     *    happens when the scheduler is notified of a view becoming dirty, but the view itself isn't
     *    reachable through traversal from our roots (e.g. it's detached from the CD tree).
     */
    private syncDirtyFlagsWithViews;
    /**
     * Attaches a view so that it will be dirty checked.
     * The view will be automatically detached when it is destroyed.
     * This will throw if the view is already attached to a ViewContainer.
     */
    attachView(viewRef: ViewRef): void;
    /**
     * Detaches a view from dirty checking again.
     */
    detachView(viewRef: ViewRef): void;
    private _loadComponent;
    /**
     * Registers a listener to be called when an instance is destroyed.
     *
     * @param callback A callback function to add as a listener.
     * @returns A function which unregisters a listener.
     */
    onDestroy(callback: () => void): VoidFunction;
    /**
     * Destroys an Angular application represented by this `ApplicationRef`. Calling this function
     * will destroy the associated environment injectors as well as all the bootstrapped components
     * with their views.
     */
    destroy(): void;
    /**
     * Returns the number of attached views.
     */
    get viewCount(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplicationRef, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ApplicationRef>;
}


/**
 * Marks a component for check (in case of OnPush components) and synchronously
 * performs change detection on the application this component belongs to.
 *
 * @param component Component to {@link ChangeDetectorRef#markForCheck mark for check}.
 *
 * @publicApi
 */
declare function applyChanges(component: {}): void;

/**
 * @publicApi
 */
export declare function asNativeElements(debugEls: DebugElement[]): any;

/**
 * Asserts that the current stack frame is within an [injection
 * context](guide/di/dependency-injection-context) and has access to `inject`.
 *
 * @param debugFn a reference to the function making the assertion (used for the error message).
 *
 * @publicApi
 */
export declare function assertInInjectionContext(debugFn: Function): void;


/**
 * Asserts that the current stack frame is not within a reactive context. Useful
 * to disallow certain code from running inside a reactive context (see {@link toSignal}).
 *
 * @param debugFn a reference to the function making the assertion (used for the error message).
 *
 * @publicApi
 */
export declare function assertNotInReactiveContext(debugFn: Function, extraContext?: string): void;

/**
 * Checks that there is currently a platform that contains the given token as a provider.
 *
 * @publicApi
 */
export declare function assertPlatform(requiredToken: any): PlatformRef;

/**
 * Type of the Attribute metadata.
 *
 * @publicApi
 */
export declare interface Attribute {
    /**
     * The name of the attribute whose value can be injected.
     */
    attributeName: string;
}

/**
 * Attribute decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Attribute: AttributeDecorator;


/**
 * Type of the Attribute decorator / constructor function.
 *
 * @publicApi
 */
export declare interface AttributeDecorator {
    /**
     * Parameter decorator for a directive constructor that designates
     * a host-element attribute whose value is injected as a constant string literal.
     *
     * @usageNotes
     *
     * Suppose we have an `<input>` element and want to know its `type`.
     *
     * ```html
     * <input type="text">
     * ```
     *
     * The following example uses the decorator to inject the string literal `text` in a directive.
     *
     * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
     *
     * The following example uses the decorator in a component constructor.
     *
     * {@example core/ts/metadata/metadata.ts region='attributeFactory'}
     *
     */
    (name: string): any;
    new (name: string): Attribute;
}

/**
 * Options to the `resource` function, for creating a resource.
 *
 * @experimental
 */
export declare interface BaseResourceOptions<T, R> {
    /**
     * A reactive function which determines the request to be made. Whenever the request changes, the
     * loader will be triggered to fetch a new value for the resource.
     *
     * If a request function isn't provided, the loader won't rerun unless the resource is reloaded.
     */
    request?: () => R;
    /**
     * The value which will be returned from the resource when a server value is unavailable, such as
     * when the resource is still loading, or in an error state.
     */
    defaultValue?: NoInfer<T>;
    /**
     * Equality function used to compare the return value of the loader.
     */
    equal?: ValueEqualityFn<T>;
    /**
     * Overrides the `Injector` used by `resource`.
     */
    injector?: Injector;
}

/**
 * Base class which implements `.value` as a `WritableSignal` by delegating `.set` and `.update`.
 */
declare abstract class BaseWritableResource<T> implements WritableResource<T> {
    readonly value: WritableSignal<T>;
    abstract readonly status: Signal<ResourceStatus>;
    abstract readonly error: Signal<unknown>;
    abstract reload(): boolean;
    constructor(value: Signal<T>);
    abstract set(value: T): void;
    update(updateFn: (value: T) => T): void;
    readonly isLoading: Signal<boolean>;
    hasValue(): this is ResourceRef<Exclude<T, undefined>>;
    asReadonly(): Resource<T>;
}


/**
 * Transforms a value (typically a string) to a boolean.
 * Intended to be used as a transform function of an input.
 *
 *  @usageNotes
 *  ```ts
 *  @Input({ transform: booleanAttribute }) status!: boolean;
 *  ```
 * @param value Value to be transformed.
 *
 * @publicApi
 */
export declare function booleanAttribute(value: unknown): boolean;

/**
 * Provides additional options to the bootstrapping process.
 *
 * @publicApi
 */
export declare interface BootstrapOptions {
    /**
     * Optionally specify which `NgZone` should be used when not configured in the providers.
     *
     * - Provide your own `NgZone` instance.
     * - `zone.js` - Use default `NgZone` which requires `Zone.js`.
     * - `noop` - Use `NoopNgZone` which does nothing.
     */
    ngZone?: NgZone | 'zone.js' | 'noop';
    /**
     * Optionally specify coalescing event change detections or not.
     * Consider the following case.
     *
     * ```html
     * <div (click)="doSomething()">
     *   <button (click)="doSomethingElse()"></button>
     * </div>
     * ```
     *
     * When button is clicked, because of the event bubbling, both
     * event handlers will be called and 2 change detections will be
     * triggered. We can coalesce such kind of events to only trigger
     * change detection only once.
     *
     * By default, this option will be false. So the events will not be
     * coalesced and the change detection will be triggered multiple times.
     * And if this option be set to true, the change detection will be
     * triggered async by scheduling a animation frame. So in the case above,
     * the change detection will only be triggered once.
     */
    ngZoneEventCoalescing?: boolean;
    /**
     * Optionally specify if `NgZone#run()` method invocations should be coalesced
     * into a single change detection.
     *
     * Consider the following case.
     * ```ts
     * for (let i = 0; i < 10; i ++) {
     *   ngZone.run(() => {
     *     // do something
     *   });
     * }
     * ```
     *
     * This case triggers the change detection multiple times.
     * With ngZoneRunCoalescing options, all change detections in an event loop trigger only once.
     * In addition, the change detection executes in requestAnimation.
     *
     */
    ngZoneRunCoalescing?: boolean;
    /**
     * When false, change detection is scheduled when Angular receives
     * a clear indication that templates need to be refreshed. This includes:
     *
     * - calling `ChangeDetectorRef.markForCheck`
     * - calling `ComponentRef.setInput`
     * - updating a signal that is read in a template
     * - attaching a view that is marked dirty
     * - removing a view
     * - registering a render hook (templates are only refreshed if render hooks do one of the above)
     *
     * @deprecated This option was introduced out of caution as a way for developers to opt out of the
     *    new behavior in v18 which schedule change detection for the above events when they occur
     *    outside the Zone. After monitoring the results post-release, we have determined that this
     *    feature is working as desired and do not believe it should ever be disabled by setting
     *    this option to `true`.
     */
    ignoreChangesOutsideZone?: boolean;
}


/**
 * The strategy that the default change detector uses to detect changes.
 * When set, takes effect the next time change detection is triggered.
 *
 * @see [Change detection usage](/api/core/ChangeDetectorRef?tab=usage-notes)
 * @see [Skipping component subtrees](/best-practices/skipping-subtrees)
 *
 * @publicApi
 */
export declare enum ChangeDetectionStrategy {
    /**
     * Use the `CheckOnce` strategy, meaning that automatic change detection is deactivated
     * until reactivated by setting the strategy to `Default` (`CheckAlways`).
     * Change detection can still be explicitly invoked.
     * This strategy applies to all child directives and cannot be overridden.
     */
    OnPush = 0,
    /**
     * Use the default `CheckAlways` strategy, in which change detection is automatic until
     * explicitly deactivated.
     */
    Default = 1
}

declare type ChangeDetectionStrategy_2 = number;

/**
 * Base class that provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be re-rendered.
 *
 * @see [Using change detection hooks](guide/components/lifecycle#using-change-detection-hooks)
 * @see [Defining custom change detection](guide/components/lifecycle#defining-custom-change-detection)
 *
 * @usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval.
 *
 * {@example core/ts/change_detect/change-detection.ts region='mark-for-check'}
 *
 * ### Detach change detector to limit how often check occurs
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * {@example core/ts/change_detect/change-detection.ts region='detach'}
 *
 *
 * ### Reattaching a detached component
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * {@example core/ts/change_detect/change-detection.ts region='reattach'}
 *
 * @publicApi
 */
export declare abstract class ChangeDetectorRef {
    /**
     * When a view uses the {@link ChangeDetectionStrategy#OnPush} (checkOnce)
     * change detection strategy, explicitly marks the view as changed so that
     * it can be checked again.
     *
     * Components are normally marked as dirty (in need of rerendering) when inputs
     * have changed or events have fired in the view. Call this method to ensure that
     * a component is checked even if these triggers have not occurred.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     */
    abstract markForCheck(): void;
    /**
     * Detaches this view from the change-detection tree.
     * A detached view is  not checked until it is reattached.
     * Use in combination with `detectChanges()` to implement local change detection checks.
     *
     * Detached views are not checked during change detection runs until they are
     * re-attached, even if they are marked as dirty.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     */
    abstract detach(): void;
    /**
     * Checks this view and its children. Use in combination with {@link ChangeDetectorRef#detach}
     * to implement local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     */
    abstract detectChanges(): void;
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * Use in development mode to verify that running change detection doesn't introduce
     * other changes. Calling it in production mode is a noop.
     *
     * @deprecated This is a test-only API that does not have a place in production interface.
     * `checkNoChanges` is already part of an `ApplicationRef` tick when the app is running in dev
     * mode. For more granular `checkNoChanges` validation, use `ComponentFixture`.
     */
    abstract checkNoChanges(): void;
    /**
     * Re-attaches the previously detached view to the change detection tree.
     * Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     */
    abstract reattach(): void;
}

declare interface ChangeDetectorRefInterface extends ChangeDetectorRef {
}

declare const CHILD_HEAD = 12;

declare const CHILD_TAIL = 13;

declare interface ClassDebugInfo {
    className: string;
    filePath?: string;
    lineNumber?: number;
    forbidOrphanRendering?: boolean;
}

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='ClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {@example core/di/ts/provider_spec.ts region='ClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface ClassProvider extends ClassSansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value by invoking a `useClass` function.
 * Base for `ClassProvider` decorator.
 *
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @publicApi
 */
export declare interface ClassSansProvider {
    /**
     * Class to instantiate for the `token`.
     */
    useClass: Type<any>;
}

declare const CLEANUP = 7;

/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 */
export declare class Compiler {
    /**
     * Compiles the given NgModule and all of its components. All templates of the components
     * have to be inlined.
     */
    compileModuleSync<T>(moduleType: Type<T>): NgModuleFactory<T>;
    /**
     * Compiles the given NgModule and all of its components
     */
    compileModuleAsync<T>(moduleType: Type<T>): Promise<NgModuleFactory<T>>;
    /**
     * Same as {@link Compiler#compileModuleSync compileModuleSync} but also creates ComponentFactories for all components.
     */
    compileModuleAndAllComponentsSync<T>(moduleType: Type<T>): ModuleWithComponentFactories<T>;
    /**
     * Same as {@link Compiler#compileModuleAsync compileModuleAsync} but also creates ComponentFactories for all components.
     */
    compileModuleAndAllComponentsAsync<T>(moduleType: Type<T>): Promise<ModuleWithComponentFactories<T>>;
    /**
     * Clears all caches.
     */
    clearCache(): void;
    /**
     * Clears the cache for the given component/ngModule.
     */
    clearCacheFor(type: Type<any>): void;
    /**
     * Returns the id for a given NgModule, if one is defined and known to the compiler.
     */
    getModuleId(moduleType: Type<any>): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<Compiler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Compiler>;
}

/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @publicApi
 */
export declare const COMPILER_OPTIONS: InjectionToken<CompilerOptions[]>;

/**
 * A factory for creating a Compiler
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 */
export declare abstract class CompilerFactory {
    abstract createCompiler(options?: CompilerOptions[]): Compiler;
}

/**
 * Options for creating a compiler.
 *
 * @publicApi
 */
export declare type CompilerOptions = {
    defaultEncapsulation?: ViewEncapsulation;
    providers?: StaticProvider[];
    preserveWhitespaces?: boolean;
};

/**
 * Supplies configuration metadata for an Angular component.
 *
 * @publicApi
 */
export declare interface Component extends Directive {
    /**
     * The change-detection strategy to use for this component.
     *
     * When a component is instantiated, Angular creates a change detector,
     * which is responsible for propagating the component's bindings.
     * The strategy is one of:
     * - `ChangeDetectionStrategy#OnPush` sets the strategy to `CheckOnce` (on demand).
     * - `ChangeDetectionStrategy#Default` sets the strategy to `CheckAlways`.
     */
    changeDetection?: ChangeDetectionStrategy;
    /**
     * Defines the set of injectable objects that are visible to its view DOM children.
     * See [example](#injecting-a-class-with-a-view-provider).
     *
     */
    viewProviders?: Provider[];
    /**
     * The module ID of the module that contains the component.
     * The component must be able to resolve relative URLs for templates and styles.
     * SystemJS exposes the `__moduleName` variable within each module.
     * In CommonJS, this can  be set to `module.id`.
     *
     * @deprecated This option does not have any effect. Will be removed in Angular v17.
     */
    moduleId?: string;
    /**
     * The relative path or absolute URL of a template file for an Angular component.
     * If provided, do not supply an inline template using `template`.
     *
     */
    templateUrl?: string;
    /**
     * An inline template for an Angular component. If provided,
     * do not supply a template file using `templateUrl`.
     *
     */
    template?: string;
    /**
     * One relative paths or an absolute URL for files containing CSS stylesheet to use
     * in this component.
     */
    styleUrl?: string;
    /**
     * Relative paths or absolute URLs for files containing CSS stylesheets to use in this component.
     */
    styleUrls?: string[];
    /**
     * One or more inline CSS stylesheets to use
     * in this component.
     */
    styles?: string | string[];
    /**
     * One or more animation `trigger()` calls, containing
     * [`state()`](api/animations/state) and `transition()` definitions.
     * See the [Animations guide](guide/animations) and animations API documentation.
     *
     */
    animations?: any[];
    /**
     * An encapsulation policy for the component's styling.
     * Possible values:
     * - `ViewEncapsulation.Emulated`: Apply modified component styles in order to emulate
     *                                 a native Shadow DOM CSS encapsulation behavior.
     * - `ViewEncapsulation.None`: Apply component styles globally without any sort of encapsulation.
     * - `ViewEncapsulation.ShadowDom`: Use the browser's native Shadow DOM API to encapsulate styles.
     *
     * If not supplied, the value is taken from the `CompilerOptions`
     * which defaults to `ViewEncapsulation.Emulated`.
     *
     * If the policy is `ViewEncapsulation.Emulated` and the component has no
     * {@link Component#styles styles} nor {@link Component#styleUrls styleUrls},
     * the policy is automatically switched to `ViewEncapsulation.None`.
     */
    encapsulation?: ViewEncapsulation;
    /**
     * Overrides the default interpolation start and end delimiters (`{{` and `}}`).
     *
     * @deprecated use Angular's default interpolation delimiters instead.
     */
    interpolation?: [string, string];
    /**
     * True to preserve or false to remove potentially superfluous whitespace characters
     * from the compiled template. Whitespace characters are those matching the `\s`
     * character class in JavaScript regular expressions. Default is false, unless
     * overridden in compiler options.
     */
    preserveWhitespaces?: boolean;
    /**
     * Angular components marked as `standalone` do not need to be declared in an NgModule. Such
     * components directly manage their own template dependencies (components, directives, and pipes
     * used in a template) via the imports property.
     *
     * More information about standalone components, directives, and pipes can be found in [this
     * guide](guide/components/importing).
     */
    standalone?: boolean;
    /**
     * The imports property specifies the standalone component's template dependencies — those
     * directives, components, and pipes that can be used within its template. Standalone components
     * can import other standalone components, directives, and pipes as well as existing NgModules.
     *
     * This property is only available for standalone components - specifying it for components
     * declared in an NgModule generates a compilation error.
     *
     * More information about standalone components, directives, and pipes can be found in [this
     * guide](guide/components/importing).
     */
    imports?: (Type<any> | ReadonlyArray<any>)[];
    /**
     * The set of schemas that declare elements to be allowed in a standalone component. Elements and
     * properties that are neither Angular components nor directives must be declared in a schema.
     *
     * This property is only available for standalone components - specifying it for components
     * declared in an NgModule generates a compilation error.
     *
     * More information about standalone components, directives, and pipes can be found in [this
     * guide](guide/components/importing).
     */
    schemas?: SchemaMetadata[];
}

/**
 * Component decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Component: ComponentDecorator;

/**
 * Component decorator interface
 *
 * @publicApi
 */
export declare interface ComponentDecorator {
    /**
     * Decorator that marks a class as an Angular component and provides configuration
     * metadata that determines how the component should be processed,
     * instantiated, and used at runtime.
     *
     * Components are the most basic UI building block of an Angular app.
     * An Angular app contains a tree of Angular components.
     *
     * Angular components are a subset of directives, always associated with a template.
     * Unlike other directives, only one component can be instantiated for a given element in a
     * template.
     *
     * Standalone components can be directly imported in any other standalone component or NgModule.
     * NgModule based apps on the other hand require components to belong to an NgModule in
     * order for them to be available to another component or application. To make a component a
     * member of an NgModule, list it in the `declarations` field of the `NgModule` metadata.
     *
     * Note that, in addition to these options for configuring a directive,
     * you can control a component's runtime behavior by implementing
     * life-cycle hooks. For more information, see the
     * [Lifecycle Hooks](guide/components/lifecycle) guide.
     *
     * @usageNotes
     *
     * ### Setting component inputs
     *
     * The following example creates a component with two data-bound properties,
     * specified by the `inputs` value.
     *
     * {@example core/ts/metadata/directives.ts region='component-input'}
     *
     *
     * ### Setting component outputs
     *
     * The following example shows two event emitters that emit on an interval. One
     * emits an output every second, while the other emits every five seconds.
     *
     * {@example core/ts/metadata/directives.ts region='component-output-interval'}
     *
     * ### Injecting a class with a view provider
     *
     * The following simple example injects a class into a component
     * using the view provider specified in component metadata:
     *
     * ```ts
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @Directive({
     *   selector: 'needs-greeter'
     * })
     * class NeedsGreeter {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     *
     * @Component({
     *   selector: 'greet',
     *   viewProviders: [
     *     Greeter
     *   ],
     *   template: `<needs-greeter></needs-greeter>`
     * })
     * class HelloWorld {
     * }
     *
     * ```
     *
     * ### Preserving whitespace
     *
     * Removing whitespace can greatly reduce AOT-generated code size and speed up view creation.
     * As of Angular 6, the default for `preserveWhitespaces` is false (whitespace is removed).
     * To change the default setting for all components in your application, set
     * the `preserveWhitespaces` option of the AOT compiler.
     *
     * By default, the AOT compiler removes whitespace characters as follows:
     * * Trims all whitespaces at the beginning and the end of a template.
     * * Removes whitespace-only text nodes. For example,
     *
     * ```html
     * <button>Action 1</button>  <button>Action 2</button>
     * ```
     *
     * becomes:
     *
     * ```html
     * <button>Action 1</button><button>Action 2</button>
     * ```
     *
     * * Replaces a series of whitespace characters in text nodes with a single space.
     * For example, `<span>\n some text\n</span>` becomes `<span> some text </span>`.
     * * Does NOT alter text nodes inside HTML tags such as `<pre>` or `<textarea>`,
     * where whitespace characters are significant.
     *
     * Note that these transformations can influence DOM nodes layout, although impact
     * should be minimal.
     *
     * You can override the default behavior to preserve whitespace characters
     * in certain fragments of a template. For example, you can exclude an entire
     * DOM sub-tree by using the `ngPreserveWhitespaces` attribute:
     *
     * ```html
     * <div ngPreserveWhitespaces>
     *     whitespaces are preserved here
     *     <span>    and here </span>
     * </div>
     * ```
     *
     * You can force a single space to be preserved in a text node by using `&ngsp;`,
     * which is replaced with a space character by Angular's template
     * compiler:
     *
     * ```html
     * <a>Spaces</a>&ngsp;<a>between</a>&ngsp;<a>links.</a>
     * <!-- compiled to be equivalent to:
     *  <a>Spaces</a> <a>between</a> <a>links.</a>  -->
     * ```
     *
     * Note that sequences of `&ngsp;` are still collapsed to just one space character when
     * the `preserveWhitespaces` option is set to `false`.
     *
     * ```html
     * <a>before</a>&ngsp;&ngsp;&ngsp;<a>after</a>
     * <!-- compiled to be equivalent to:
     *  <a>before</a> <a>after</a> -->
     * ```
     *
     * To preserve sequences of whitespace characters, use the
     * `ngPreserveWhitespaces` attribute.
     *
     * @Annotation
     */
    (obj: Component): TypeDecorator;
    /**
     * See the `Component` decorator.
     */
    new (obj: Component): Component;
}

declare interface ComponentDefFeature {
    <T>(componentDef: ɵComponentDef<T>): void;
    /**
     * Marks a feature as something that {@link InheritDefinitionFeature} will execute
     * during inheritance.
     *
     * NOTE: DO NOT SET IN ROOT OF MODULE! Doing so will result in tree-shakers/bundlers
     * identifying the change as a side effect, and the feature will be included in
     * every bundle.
     */
    ngInherit?: true;
}

declare interface ComponentDefinition<T> extends Omit<DirectiveDefinition<T>, 'features'> {
    /**
     * The number of nodes, local refs, and pipes in this component template.
     *
     * Used to calculate the length of this component's LView array, so we
     * can pre-fill the array and set the binding start index.
     */
    decls: number;
    /**
     * The number of bindings in this component template (including pure fn bindings).
     *
     * Used to calculate the length of this component's LView array, so we
     * can pre-fill the array and set the host binding start index.
     */
    vars: number;
    /**
     * Template function use for rendering DOM.
     *
     * This function has following structure.
     *
     * ```ts
     * function Template<T>(ctx:T, creationMode: boolean) {
     *   if (creationMode) {
     *     // Contains creation mode instructions.
     *   }
     *   // Contains binding update instructions
     * }
     * ```
     *
     * Common instructions are:
     * Creation mode instructions:
     *  - `elementStart`, `elementEnd`
     *  - `text`
     *  - `container`
     *  - `listener`
     *
     * Binding update instructions:
     * - `bind`
     * - `elementAttribute`
     * - `elementProperty`
     * - `elementClass`
     * - `elementStyle`
     *
     */
    template: ComponentTemplate<T>;
    /**
     * Constants for the nodes in the component's view.
     * Includes attribute arrays, local definition arrays etc.
     */
    consts?: TConstantsOrFactory;
    /**
     * An array of `ngContent[selector]` values that were found in the template.
     */
    ngContentSelectors?: string[];
    /**
     * A list of optional features to apply.
     *
     * See: {@link NgOnChangesFeature}, {@link ProvidersFeature}
     */
    features?: ComponentDefFeature[];
    /**
     * Defines template and style encapsulation options available for Component's {@link Component}.
     */
    encapsulation?: ViewEncapsulation;
    /**
     * Defines arbitrary developer-defined data to be stored on a renderer instance.
     * This is useful for renderers that delegate to other renderers.
     *
     * see: animation
     */
    data?: {
        [kind: string]: any;
    };
    /**
     * A set of styles that the component needs to be present for component to render correctly.
     */
    styles?: string[];
    /**
     * The strategy that the default change detector uses to detect changes.
     * When set, takes effect the next time change detection is triggered.
     */
    changeDetection?: ChangeDetectionStrategy;
    /**
     * Registry of directives, components, and pipes that may be found in this component's view.
     *
     * This property is either an array of types or a function that returns the array of types. This
     * function may be necessary to support forward declarations.
     */
    dependencies?: TypeOrFactory<DependencyTypeList>;
    /**
     * The set of schemas that declare elements to be allowed in the component's template.
     */
    schemas?: SchemaMetadata[] | null;
}

/** Component dependencies info as calculated during runtime by the deps tracker. */
declare interface ComponentDependencies {
    dependencies: DependencyTypeList;
}

/**
 * Base class for a factory that can create a component dynamically.
 * Instantiate a factory for a given type of component with `resolveComponentFactory()`.
 * Use the resulting `ComponentFactory.create()` method to create a component of that type.
 *
 * @publicApi
 *
 * @deprecated Angular no longer requires Component factories. Please use other APIs where
 *     Component class can be used directly.
 */
declare abstract class ComponentFactory<C> {
    /**
     * The component's HTML selector.
     */
    abstract get selector(): string;
    /**
     * The type of component the factory will create.
     */
    abstract get componentType(): Type<any>;
    /**
     * Selector for all <ng-content> elements in the component.
     */
    abstract get ngContentSelectors(): string[];
    /**
     * The inputs of the component.
     */
    abstract get inputs(): {
        propName: string;
        templateName: string;
        transform?: (value: any) => any;
        isSignal: boolean;
    }[];
    /**
     * The outputs of the component.
     */
    abstract get outputs(): {
        propName: string;
        templateName: string;
    }[];
    /**
     * Creates a new component.
     */
    abstract create(injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: string | any, environmentInjector?: EnvironmentInjector | NgModuleRef<any>): ComponentRef<C>;
}
export { ComponentFactory }
export { ComponentFactory as ɵComponentFactory }

/**
 * A simple registry that maps `Components` to generated `ComponentFactory` classes
 * that can be used to create instances of components.
 * Use to obtain the factory for a given component type,
 * then use the factory's `create()` method to create a component of that type.
 *
 * Note: since v13, dynamic component creation via
 * [`ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)
 * does **not** require resolving component factory: component class can be used directly.
 *
 * @publicApi
 *
 * @deprecated Angular no longer requires Component factories. Please use other APIs where
 *     Component class can be used directly.
 */
export declare abstract class ComponentFactoryResolver {
    static NULL: ComponentFactoryResolver;
    /**
     * Retrieves the factory object that creates a component of the given type.
     * @param component The component type.
     */
    abstract resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T>;
}

declare class ComponentFactoryResolver_2 extends ComponentFactoryResolver {
    private ngModule?;
    /**
     * @param ngModule The NgModuleRef to which all resolved factories are bound.
     */
    constructor(ngModule?: NgModuleRef<any> | undefined);
    resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T>;
}

/**
 * An interface that describes the subset of component metadata
 * that can be retrieved using the `reflectComponentType` function.
 *
 * @publicApi
 */
export declare interface ComponentMirror<C> {
    /**
     * The component's HTML selector.
     */
    get selector(): string;
    /**
     * The type of component the factory will create.
     */
    get type(): Type<C>;
    /**
     * The inputs of the component.
     */
    get inputs(): ReadonlyArray<{
        readonly propName: string;
        readonly templateName: string;
        readonly transform?: (value: any) => any;
        readonly isSignal: boolean;
    }>;
    /**
     * The outputs of the component.
     */
    get outputs(): ReadonlyArray<{
        readonly propName: string;
        readonly templateName: string;
    }>;
    /**
     * Selector for all <ng-content> elements in the component.
     */
    get ngContentSelectors(): ReadonlyArray<string>;
    /**
     * Whether this component is marked as standalone.
     * Note: an extra flag, not present in `ComponentFactory`.
     */
    get isStandalone(): boolean;
}

/**
 * Represents a component created by a `ComponentFactory`.
 * Provides access to the component instance and related objects,
 * and provides the means of destroying the instance.
 *
 * @publicApi
 */
export declare abstract class ComponentRef<C> {
    /**
     * Updates a specified input name to a new value. Using this method will properly mark for check
     * component using the `OnPush` change detection strategy. It will also assure that the
     * `OnChanges` lifecycle hook runs when a dynamically created component is change-detected.
     *
     * @param name The name of an input.
     * @param value The new value of an input.
     */
    abstract setInput(name: string, value: unknown): void;
    /**
     * The host or anchor element for this component instance.
     */
    abstract get location(): ElementRef;
    /**
     * The dependency injector for this component instance.
     */
    abstract get injector(): Injector;
    /**
     * This component instance.
     */
    abstract get instance(): C;
    /**
     * The host view defined by the template
     * for this component instance.
     */
    abstract get hostView(): ViewRef;
    /**
     * The change detector for this component instance.
     */
    abstract get changeDetectorRef(): ChangeDetectorRef;
    /**
     * The type of this component (as created by a `ComponentFactory` class).
     */
    abstract get componentType(): Type<any>;
    /**
     * Destroys the component instance and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for the component.
     * @param callback A handler function that cleans up developer-defined data
     * associated with this component. Called when the `destroy()` method is invoked.
     */
    abstract onDestroy(callback: Function): void;
}

/**
 * Definition of what a template rendering function should look like for a component.
 */
declare type ComponentTemplate<T> = {
    <U extends T>(rf: ɵRenderFlags, ctx: T | U): void;
};

/**
 * Create a computed `Signal` which derives a reactive value from an expression.
 */
export declare function computed<T>(computation: () => T, options?: CreateComputedOptions<T>): Signal<T>;

/**
 * Configures the `Injector` to return an instance of a token.
 *
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface ConstructorProvider extends ConstructorSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: Type<any>;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return an instance of a token.
 *
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @usageNotes
 *
 * ```ts
 * @Injectable(SomeModule, {deps: []})
 * class MyService {}
 * ```
 *
 * @publicApi
 */
export declare interface ConstructorSansProvider {
    /**
     * A list of `token`s to be resolved by the injector.
     */
    deps?: any[];
}

declare const CONTAINERS = "c";

/**
 * Type of the ContentChild metadata.
 *
 * @publicApi
 */
export declare type ContentChild = Query;

/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 *
 * @publicApi
 */
export declare const ContentChild: ContentChildDecorator;

/**
 * Initializes a content child query. Consider using `contentChild.required` for queries that should
 * always match.
 *
 * @usageNotes
 * Create a child query in your component by declaring a
 * class field and initializing it with the `contentChild()` function.
 *
 * ```ts
 * @Component({...})
 * export class TestComponent {
 *   headerEl = contentChild<ElementRef>('h');                    // Signal<ElementRef|undefined>
 *   headerElElRequired = contentChild.required<ElementRef>('h'); // Signal<ElementRef>
 *   header = contentChild(MyHeader);                             // Signal<MyHeader|undefined>
 *   headerRequired = contentChild.required(MyHeader);            // Signal<MyHeader>
 * }
 * ```
 *
 * @initializerApiFunction
 * @publicAPI
 */
export declare const contentChild: ContentChildFunction;

/**
 * Type of the ContentChild decorator / constructor function.
 *
 * @publicApi
 */
export declare interface ContentChildDecorator {
    /**
     * @description
     * Property decorator that configures a content query.
     *
     * Use to get the first element or the directive matching the selector from the content DOM.
     * If the content DOM changes, and a new child matches the selector,
     * the property will be updated.
     *
     * Does not retrieve elements or directives that are in other components' templates,
     * since a component's template is always a black box to its ancestors.
     *
     * **Metadata Properties**:
     *
     * * **selector** - The directive type or the name used for querying.
     * * **descendants** - If `true` (default) include all descendants of the element. If `false` then
     * only query direct children of the element.
     * * **read** - Used to read a different token from the queried element.
     * * **static** - True to resolve query results before change detection runs,
     * false to resolve after change detection. Defaults to false.
     *
     * The following selectors are supported.
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * A template reference variable as a string (e.g. query `<my-component #cmp></my-component>`
     * with `@ContentChild('cmp')`)
     *   * Any provider defined in the child component tree of the current component (e.g.
     * `@ContentChild(SomeService) someService: SomeService`)
     *   * Any provider defined through a string token (e.g. `@ContentChild('someToken') someTokenVal:
     * any`)
     *   * A `TemplateRef` (e.g. query `<ng-template></ng-template>` with `@ContentChild(TemplateRef)
     * template;`)
     *
     * The following values are supported by `read`:
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * Any provider defined on the injector of the component that is matched by the `selector` of
     * this query
     *   * Any provider defined through a string token (e.g. `{provide: 'token', useValue: 'val'}`)
     *   * `TemplateRef`, `ElementRef`, and `ViewContainerRef`
     *
     * Difference between dynamic and static queries:
     *
     * | Queries                             | Details |
     * |:---                                 |:---     |
     * | Dynamic queries \(`static: false`\) | The query resolves before the `ngAfterContentInit()`
     * callback is called. The result will be updated for changes to your view, such as changes to
     * `ngIf` and `ngFor` blocks. | | Static queries \(`static: true`\)   | The query resolves once
     * the view has been created, but before change detection runs (before the `ngOnInit()` callback
     * is called). The result, though, will never be updated to reflect changes to your view, such as
     * changes to `ngIf` and `ngFor` blocks.  |
     *
     * @usageNotes
     *
     * {@example core/di/ts/contentChild/content_child_howto.ts region='HowTo'}
     *
     * ### Example
     *
     * {@example core/di/ts/contentChild/content_child_example.ts region='Component'}
     *
     * @Annotation
     */
    (selector: ProviderToken<unknown> | Function | string, opts?: {
        descendants?: boolean;
        read?: any;
        static?: boolean;
    }): any;
    new (selector: ProviderToken<unknown> | Function | string, opts?: {
        descendants?: boolean;
        read?: any;
        static?: boolean;
    }): ContentChild;
}

/**
 * Type of the `contentChild` function.
 *
 * The contentChild function creates a singular content query. It is a special function that also
 * provides access to required query results via the `.required` property.
 *
 * @publicAPI
 * @docsPrivate Ignored because `contentChild` is the canonical API entry.
 */
export declare interface ContentChildFunction {
    /**
     * Initializes a content child query.
     *
     * Consider using `contentChild.required` for queries that should always match.
     * @publicAPI
     */
    <LocatorT>(locator: ProviderToken<LocatorT> | string, opts?: {
        descendants?: boolean;
        read?: undefined;
        debugName?: string;
    }): Signal<LocatorT | undefined>;
    <LocatorT, ReadT>(locator: ProviderToken<LocatorT> | string, opts: {
        descendants?: boolean;
        read: ProviderToken<ReadT>;
        debugName?: string;
    }): Signal<ReadT | undefined>;
    /**
     * Initializes a content child query that is always expected to match.
     */
    required: {
        <LocatorT>(locator: ProviderToken<LocatorT> | string, opts?: {
            descendants?: boolean;
            read?: undefined;
            debugName?: string;
        }): Signal<LocatorT>;
        <LocatorT, ReadT>(locator: ProviderToken<LocatorT> | string, opts: {
            descendants?: boolean;
            read: ProviderToken<ReadT>;
            debugName?: string;
        }): Signal<ReadT>;
    };
}

/**
 * Type of the ContentChildren metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export declare type ContentChildren = Query;

/**
 * ContentChildren decorator and metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export declare const ContentChildren: ContentChildrenDecorator;

export declare function contentChildren<LocatorT>(locator: ProviderToken<LocatorT> | string, opts?: {
    descendants?: boolean;
    read?: undefined;
    debugName?: string;
}): Signal<ReadonlyArray<LocatorT>>;

export declare function contentChildren<LocatorT, ReadT>(locator: ProviderToken<LocatorT> | string, opts: {
    descendants?: boolean;
    read: ProviderToken<ReadT>;
    debugName?: string;
}): Signal<ReadonlyArray<ReadT>>;

/**
 * Type of the ContentChildren decorator / constructor function.
 *
 * @see {@link ContentChildren}
 * @publicApi
 */
export declare interface ContentChildrenDecorator {
    /**
     * @description
     * Property decorator that configures a content query.
     *
     * Use to get the `QueryList` of elements or directives from the content DOM.
     * Any time a child element is added, removed, or moved, the query list will be
     * updated, and the changes observable of the query list will emit a new value.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     *
     * Does not retrieve elements or directives that are in other components' templates,
     * since a component's template is always a black box to its ancestors.
     *
     * **Metadata Properties**:
     *
     * * **selector** - The directive type or the name used for querying.
     * * **descendants** - If `true` include all descendants of the element. If `false` then only
     * query direct children of the element.
     * * **emitDistinctChangesOnly** - The ` QueryList#changes` observable will emit new values only
     *   if the QueryList result has changed. When `false` the `changes` observable might emit even
     *   if the QueryList has not changed.
     *   ** Note: *** This config option is **deprecated**, it will be permanently set to `true` and
     *   removed in future versions of Angular.
     * * **read** - Used to read a different token from the queried elements.
     *
     * The following selectors are supported.
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * A template reference variable as a string (e.g. query `<my-component #cmp></my-component>`
     * with `@ContentChildren('cmp')`)
     *   * Any provider defined in the child component tree of the current component (e.g.
     * `@ContentChildren(SomeService) someService: SomeService`)
     *   * Any provider defined through a string token (e.g. `@ContentChildren('someToken')
     * someTokenVal: any`)
     *   * A `TemplateRef` (e.g. query `<ng-template></ng-template>` with
     * `@ContentChildren(TemplateRef) template;`)
     *
     * In addition, multiple string selectors can be separated with a comma (e.g.
     * `@ContentChildren('cmp1,cmp2')`)
     *
     * The following values are supported by `read`:
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * Any provider defined on the injector of the component that is matched by the `selector` of
     * this query
     *   * Any provider defined through a string token (e.g. `{provide: 'token', useValue: 'val'}`)
     *   * `TemplateRef`, `ElementRef`, and `ViewContainerRef`
     *
     * @usageNotes
     *
     * Here is a simple demonstration of how the `ContentChildren` decorator can be used.
     *
     * {@example core/di/ts/contentChildren/content_children_howto.ts region='HowTo'}
     *
     * ### Tab-pane example
     *
     * Here is a slightly more realistic example that shows how `ContentChildren` decorators
     * can be used to implement a tab pane component.
     *
     * {@example core/di/ts/contentChildren/content_children_example.ts region='Component'}
     *
     * @Annotation
     */
    (selector: ProviderToken<unknown> | Function | string, opts?: {
        descendants?: boolean;
        emitDistinctChangesOnly?: boolean;
        read?: any;
    }): any;
    new (selector: ProviderToken<unknown> | Function | string, opts?: {
        descendants?: boolean;
        emitDistinctChangesOnly?: boolean;
        read?: any;
    }): Query;
}

/**
 * Definition of what a content queries function should look like.
 */
declare type ContentQueriesFunction<T> = <U extends T>(rf: ɵRenderFlags, ctx: U, directiveIndex: number) => void;

declare const CONTEXT = 8;

/**
 * Creates a `ComponentRef` instance based on provided component type and a set of options.
 *
 * @usageNotes
 *
 * The example below demonstrates how the `createComponent` function can be used
 * to create an instance of a ComponentRef dynamically and attach it to an ApplicationRef,
 * so that it gets included into change detection cycles.
 *
 * Note: the example uses standalone components, but the function can also be used for
 * non-standalone components (declared in an NgModule) as well.
 *
 * ```angular-ts
 * @Component({
 *   standalone: true,
 *   template: `Hello {{ name }}!`
 * })
 * class HelloComponent {
 *   name = 'Angular';
 * }
 *
 * @Component({
 *   standalone: true,
 *   template: `<div id="hello-component-host"></div>`
 * })
 * class RootComponent {}
 *
 * // Bootstrap an application.
 * const applicationRef = await bootstrapApplication(RootComponent);
 *
 * // Locate a DOM node that would be used as a host.
 * const hostElement = document.getElementById('hello-component-host');
 *
 * // Get an `EnvironmentInjector` instance from the `ApplicationRef`.
 * const environmentInjector = applicationRef.injector;
 *
 * // We can now create a `ComponentRef` instance.
 * const componentRef = createComponent(HelloComponent, {hostElement, environmentInjector});
 *
 * // Last step is to register the newly created ref using the `ApplicationRef` instance
 * // to include the component view into change detection cycles.
 * applicationRef.attachView(componentRef.hostView);
 * componentRef.changeDetectorRef.detectChanges();
 * ```
 *
 * @param component Component class reference.
 * @param options Set of options to use:
 *  * `environmentInjector`: An `EnvironmentInjector` instance to be used for the component.
 *  * `hostElement` (optional): A DOM node that should act as a host node for the component. If not
 * provided, Angular creates one based on the tag name used in the component selector (and falls
 * back to using `div` if selector doesn't have tag name info).
 *  * `elementInjector` (optional): An `ElementInjector` instance, see additional info about it
 * [here](guide/di/hierarchical-dependency-injection#elementinjector).
 *  * `projectableNodes` (optional): A list of DOM nodes that should be projected through
 * [`<ng-content>`](api/core/ng-content) of the new component instance, e.g.,
 * `[[element1, element2]]`: projects `element1` and `element2` into the same `<ng-content>`.
 * `[[element1, element2], [element3]]`: projects `element1` and `element2` into one `<ng-content>`,
 * and `element3` into a separate `<ng-content>`.
 * @returns ComponentRef instance that represents a given Component.
 *
 * @publicApi
 */
export declare function createComponent<C>(component: Type<C>, options: {
    environmentInjector: EnvironmentInjector;
    hostElement?: Element;
    elementInjector?: Injector;
    projectableNodes?: Node[][];
}): ComponentRef<C>;

/**
 * Options passed to the `computed` creation function.
 */
export declare interface CreateComputedOptions<T> {
    /**
     * A comparison function which defines equality for computed values.
     */
    equal?: ValueEqualityFn<T>;
    /**
     * A debug name for the computed signal. Used in Angular DevTools to identify the signal.
     */
    debugName?: string;
}

/**
 * Options passed to the `effect` function.
 *
 * @developerPreview
 */
export declare interface CreateEffectOptions {
    /**
     * The `Injector` in which to create the effect.
     *
     * If this is not provided, the current [injection context](guide/di/dependency-injection-context)
     * will be used instead (via `inject`).
     */
    injector?: Injector;
    /**
     * Whether the `effect` should require manual cleanup.
     *
     * If this is `false` (the default) the effect will automatically register itself to be cleaned up
     * with the current `DestroyRef`.
     */
    manualCleanup?: boolean;
    /**
     * Always create a root effect (which is scheduled as a microtask) regardless of whether `effect`
     * is called within a component.
     */
    forceRoot?: true;
    /**
     * @deprecated no longer required, signal writes are allowed by default.
     */
    allowSignalWrites?: boolean;
    /**
     * A debug name for the effect. Used in Angular DevTools to identify the effect.
     */
    debugName?: string;
}

/**
 * Create a new environment injector.
 *
 * @param providers An array of providers.
 * @param parent A parent environment injector.
 * @param debugName An optional name for this injector instance, which will be used in error
 *     messages.
 *
 * @publicApi
 */
export declare function createEnvironmentInjector(providers: Array<Provider | EnvironmentProviders>, parent: EnvironmentInjector, debugName?: string | null): EnvironmentInjector;

/**
 * Returns a new NgModuleRef instance based on the NgModule class and parent injector provided.
 *
 * @param ngModule NgModule class.
 * @param parentInjector Optional injector instance to use as a parent for the module injector. If
 *     not provided, `NullInjector` will be used instead.
 * @returns NgModuleRef that represents an NgModule instance.
 *
 * @publicApi
 */
export declare function createNgModule<T>(ngModule: Type<T>, parentInjector?: Injector): NgModuleRef<T>;

/**
 * The `createNgModule` function alias for backwards-compatibility.
 * Please avoid using it directly and use `createNgModule` instead.
 *
 * @deprecated Use `createNgModule` instead.
 */
export declare const createNgModuleRef: typeof createNgModule;

/**
 * Creates a platform.
 * Platforms must be created on launch using this function.
 *
 * @publicApi
 */
export declare function createPlatform(injector: Injector): PlatformRef;

/**
 * Creates a factory for a platform. Can be used to provide or override `Providers` specific to
 * your application's runtime needs, such as `PLATFORM_INITIALIZER` and `PLATFORM_ID`.
 * @param parentPlatformFactory Another platform factory to modify. Allows you to compose factories
 * to build up configurations that might be required by different libraries or parts of the
 * application.
 * @param name Identifies the new platform factory.
 * @param providers A set of dependency providers for platforms created with the new factory.
 *
 * @publicApi
 */
export declare function createPlatformFactory(parentPlatformFactory: ((extraProviders?: StaticProvider[]) => PlatformRef) | null, name: string, providers?: StaticProvider[]): (extraProviders?: StaticProvider[]) => PlatformRef;

/**
 * Options passed to the `signal` creation function.
 */
export declare interface CreateSignalOptions<T> {
    /**
     * A comparison function which defines equality for signal values.
     */
    equal?: ValueEqualityFn<T>;
    /**
     * A debug name for the signal. Used in Angular DevTools to identify the signal.
     */
    debugName?: string;
}

/**
 * Token used to configure the [Content Security Policy](https://web.dev/strict-csp/) nonce that
 * Angular will apply when inserting inline styles. If not provided, Angular will look up its value
 * from the `ngCspNonce` attribute of the application root node.
 *
 * @publicApi
 */
export declare const CSP_NONCE: InjectionToken<string | null>;


/**
 * Expresses a single CSS Selector.
 *
 * Beginning of array
 * - First index: element name
 * - Subsequent odd indices: attr keys
 * - Subsequent even indices: attr values
 *
 * After SelectorFlags.CLASS flag
 * - Class name values
 *
 * SelectorFlags.NOT flag
 * - Changes the mode to NOT
 * - Can be combined with other flags to set the element / attr / class mode
 *
 * e.g. SelectorFlags.NOT | SelectorFlags.ELEMENT
 *
 * Example:
 * Original: `div.foo.bar[attr1=val1][attr2]`
 * Parsed: ['div', 'attr1', 'val1', 'attr2', '', SelectorFlags.CLASS, 'foo', 'bar']
 *
 * Original: 'div[attr1]:not(.foo[attr2])
 * Parsed: [
 *  'div', 'attr1', '',
 *  SelectorFlags.NOT | SelectorFlags.ATTRIBUTE 'attr2', '', SelectorFlags.CLASS, 'foo'
 * ]
 *
 * See more examples in node_selector_matcher_spec.ts
 */
declare type CssSelector = (string | SelectorFlags)[];

/**
 * An object literal of this type is used to represent the metadata of a constructor dependency.
 * The type itself is never referred to from generated code.
 *
 * @publicApi
 */
declare type CtorDependency = {
    /**
     * If an `@Attribute` decorator is used, this represents the injected attribute's name. If the
     * attribute name is a dynamic expression instead of a string literal, this will be the unknown
     * type.
     */
    attribute?: string | unknown;
    /**
     * If `@Optional()` is used, this key is set to true.
     */
    optional?: true;
    /**
     * If `@Host` is used, this key is set to true.
     */
    host?: true;
    /**
     * If `@Self` is used, this key is set to true.
     */
    self?: true;
    /**
     * If `@SkipSelf` is used, this key is set to true.
     */
    skipSelf?: true;
} | null;

/**
 * Defines a schema that allows an NgModule to contain the following:
 * - Non-Angular elements named with dash case (`-`).
 * - Element properties named with dash case (`-`).
 * Dash case is the naming convention for custom elements.
 *
 * @publicApi
 */
export declare const CUSTOM_ELEMENTS_SCHEMA: SchemaMetadata;

/**
 * @publicApi
 *
 * @see [Component testing scenarios](guide/testing/components-scenarios)
 * @see [Basics of testing components](guide/testing/components-basics)
 * @see [Testing utility APIs](guide/testing/utility-apis)
 */
export declare class DebugElement extends DebugNode {
    constructor(nativeNode: Element);
    /**
     * The underlying DOM element at the root of the component.
     */
    get nativeElement(): any;
    /**
     * The element tag name, if it is an element.
     */
    get name(): string;
    /**
     *  Gets a map of property names to property values for an element.
     *
     *  This map includes:
     *  - Regular property bindings (e.g. `[id]="id"`)
     *  - Host property bindings (e.g. `host: { '[id]': "id" }`)
     *  - Interpolated property bindings (e.g. `id="{{ value }}")
     *
     *  It does not include:
     *  - input property bindings (e.g. `[myCustomInput]="value"`)
     *  - attribute bindings (e.g. `[attr.role]="menu"`)
     */
    get properties(): {
        [key: string]: any;
    };
    /**
     *  A map of attribute names to attribute values for an element.
     */
    get attributes(): {
        [key: string]: string | null;
    };
    /**
     * The inline styles of the DOM element.
     */
    get styles(): {
        [key: string]: string | null;
    };
    /**
     * A map containing the class names on the element as keys.
     *
     * This map is derived from the `className` property of the DOM element.
     *
     * Note: The values of this object will always be `true`. The class key will not appear in the KV
     * object if it does not exist on the element.
     *
     * @see [Element.className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)
     */
    get classes(): {
        [key: string]: boolean;
    };
    /**
     * The `childNodes` of the DOM element as a `DebugNode` array.
     *
     * @see [Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
     */
    get childNodes(): DebugNode[];
    /**
     * The immediate `DebugElement` children. Walk the tree by descending through `children`.
     */
    get children(): DebugElement[];
    /**
     * @returns the first `DebugElement` that matches the predicate at any depth in the subtree.
     */
    query(predicate: Predicate<DebugElement>): DebugElement;
    /**
     * @returns All `DebugElement` matches for the predicate at any depth in the subtree.
     */
    queryAll(predicate: Predicate<DebugElement>): DebugElement[];
    /**
     * @returns All `DebugNode` matches for the predicate at any depth in the subtree.
     */
    queryAllNodes(predicate: Predicate<DebugNode>): DebugNode[];
    /**
     * Triggers the event by its name if there is a corresponding listener in the element's
     * `listeners` collection.
     *
     * If the event lacks a listener or there's some other problem, consider
     * calling `nativeElement.dispatchEvent(eventObject)`.
     *
     * @param eventName The name of the event to trigger
     * @param eventObj The _event object_ expected by the handler
     *
     * @see [Testing components scenarios](guide/testing/components-scenarios#trigger-event-handler)
     */
    triggerEventHandler(eventName: string, eventObj?: any): void;
}

/**
 * @publicApi
 */
export declare class DebugEventListener {
    name: string;
    callback: Function;
    constructor(name: string, callback: Function);
}

/**
 * @publicApi
 */
export declare class DebugNode {
    /**
     * The underlying DOM node.
     */
    readonly nativeNode: any;
    constructor(nativeNode: Node);
    /**
     * The `DebugElement` parent. Will be `null` if this is the root element.
     */
    get parent(): DebugElement | null;
    /**
     * The host dependency injector. For example, the root element's component instance injector.
     */
    get injector(): Injector;
    /**
     * The element's own component instance, if it has one.
     */
    get componentInstance(): any;
    /**
     * An object that provides parent context for this element. Often an ancestor component instance
     * that governs this element.
     *
     * When an element is repeated within *ngFor, the context is an `NgForOf` whose `$implicit`
     * property is the value of the row instance value. For example, the `hero` in `*ngFor="let hero
     * of heroes"`.
     */
    get context(): any;
    /**
     * The callbacks attached to the component's @Output properties and/or the element's event
     * properties.
     */
    get listeners(): DebugEventListener[];
    /**
     * Dictionary of objects associated with template local variables (e.g. #foo), keyed by the local
     * variable name.
     */
    get references(): {
        [key: string]: any;
    };
    /**
     * This component's injector lookup tokens. Includes the component itself plus the tokens that the
     * component lists in its providers metadata.
     */
    get providerTokens(): any[];
}

/**
 * A debug representation of the signal graph.
 */
declare interface DebugSignalGraph {
    nodes: DebugSignalGraphNode[];
    edges: DebugSignalGraphEdge[];
}

declare interface DebugSignalGraphEdge {
    /**
     * Index of a signal node in the `nodes` array that is a consumer of the signal produced by the producer node.
     */
    consumer: number;
    /**
     * Index of a signal node in the `nodes` array that is a producer of the signal consumed by the consumer node.
     */
    producer: number;
}

declare interface DebugSignalGraphNode {
    kind: string;
    label?: string;
    value?: unknown;
}

declare const DECLARATION_COMPONENT_VIEW = 15;

declare const DECLARATION_LCONTAINER = 16;

declare const DECLARATION_VIEW = 14;

/**
 * Provide this token to set the default currency code your application uses for
 * CurrencyPipe when there is no currency code passed into it. This is only used by
 * CurrencyPipe and has no relation to locale currency. Defaults to USD if not configured.
 *
 * See the [i18n guide](guide/i18n/locale-id) for more information.
 *
 * <div class="docs-alert docs-alert-helpful">
 *
 * **Deprecation notice:**
 *
 * The default currency code is currently always `USD` but this is deprecated from v9.
 *
 * **In v10 the default currency code will be taken from the current locale.**
 *
 * If you need the previous behavior then set it by creating a `DEFAULT_CURRENCY_CODE` provider in
 * your application `NgModule`:
 *
 * ```ts
 * {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}
 * ```
 *
 * </div>
 *
 * @usageNotes
 * ### Example
 *
 * ```ts
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }]
 * });
 * ```
 *
 * @publicApi
 */
export declare const DEFAULT_CURRENCY_CODE: InjectionToken<string>;

/**
 * @deprecated v4.0.0 - Should not be part of public API.
 * @publicApi
 */
export declare class DefaultIterableDiffer<V> implements IterableDiffer<V>, IterableChanges<V> {
    readonly length: number;
    readonly collection: V[] | Iterable<V> | null;
    private _linkedRecords;
    private _unlinkedRecords;
    private _previousItHead;
    private _itHead;
    private _itTail;
    private _additionsHead;
    private _additionsTail;
    private _movesHead;
    private _movesTail;
    private _removalsHead;
    private _removalsTail;
    private _identityChangesHead;
    private _identityChangesTail;
    private _trackByFn;
    constructor(trackByFn?: TrackByFunction<V>);
    forEachItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachOperation(fn: (item: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void): void;
    forEachPreviousItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachAddedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachMovedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachRemovedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachIdentityChange(fn: (record: IterableChangeRecord_<V>) => void): void;
    diff(collection: NgIterable<V> | null | undefined): DefaultIterableDiffer<V> | null;
    onDestroy(): void;
    check(collection: NgIterable<V>): boolean;
    get isDirty(): boolean;
    private _addToRemovals;
}

declare const DEFER_BLOCK_ID = "di";

declare const DEFER_BLOCK_STATE = "s";

/** Retrieved information about a `@defer` block. */
declare interface DeferBlockData {
    /** Current state of the block. */
    state: 'placeholder' | 'loading' | 'complete' | 'error' | 'initial';
    /** Hydration state of the block. */
    incrementalHydrationState: 'not-configured' | 'hydrated' | 'dehydrated';
    /** Wherther the block has a connected `@error` block. */
    hasErrorBlock: boolean;
    /** Information about the connected `@loading` block. */
    loadingBlock: {
        /** Whether the block is defined. */
        exists: boolean;
        /** Minimum amount of milliseconds that the block should be shown. */
        minimumTime: number | null;
        /** Amount of time after which the block should be shown. */
        afterTime: number | null;
    };
    /** Information about the connected `@placeholder` block. */
    placeholderBlock: {
        /** Whether the block is defined. */
        exists: boolean;
        /** Minimum amount of time that block should be shown. */
        minimumTime: number | null;
    };
    /** Stringified version of the block's triggers. */
    triggers: string[];
    /** Element root nodes that are currently being shown in the block. */
    rootNodes: Node[];
}

/**
 * Represents defer trigger types.
 */
declare const enum DeferBlockTrigger {
    Idle = 0,
    Immediate = 1,
    Viewport = 2,
    Interaction = 3,
    Hover = 4,
    Timer = 5,
    When = 6,
    Never = 7
}

/**
 * Describes the state of defer block dependency loading.
 */
declare enum DeferDependenciesLoadingState {
    /** Initial state, dependency loading is not yet triggered */
    NOT_STARTED = 0,
    /** Dependency loading is in progress */
    IN_PROGRESS = 1,
    /** Dependency loading has completed successfully */
    COMPLETE = 2,
    /** Dependency loading has failed */
    FAILED = 3
}

/** Configuration object for a loading block as it is stored in the component constants. */
declare type DeferredLoadingBlockConfig = [minimumTime: number | null, afterTime: number | null];

/** Configuration object for a placeholder block as it is stored in the component constants. */
declare type DeferredPlaceholderBlockConfig = [minimumTime: number | null];

/**
 * @deprecated in v8, delete after v10. This API should be used only by generated code, and that
 * code should now use ɵɵdefineInjectable instead.
 * @publicApi
 */
export declare const defineInjectable: typeof ɵɵdefineInjectable;

/**
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
 */
declare const DEHYDRATED_VIEWS = 6;

/**
 * An object that contains hydration-related information serialized
 * on the server, as well as the necessary references to segments of
 * the DOM, to facilitate the hydration process for a given view
 * inside a view container (either an embedded view or a view created
 * for a component).
 */
declare interface DehydratedContainerView extends DehydratedView {
    data: Readonly<SerializedContainerView>;
}

/**
 * Basic set of data structures used for identifying a defer block
 * and triggering defer blocks
 */
declare interface DehydratedDeferBlock {
    lView: LView;
    tNode: TNode;
    lContainer: LContainer;
}

/**
 * An object that contains information about a dehydrated ICU case,
 * to facilitate cleaning up ICU cases that were active during
 * server-side rendering, but not during hydration.
 */
declare interface DehydratedIcuData {
    /**
     * The case index that this data represents.
     */
    case: number;
    /**
     * A reference back to the AST for the ICU node. This allows the
     * AST to be used to clean up dehydrated nodes.
     */
    node: I18nICUNode;
}

/**
 * An object that contains hydration-related information serialized
 * on the server, as well as the necessary references to segments of
 * the DOM, to facilitate the hydration process for a given hydration
 * boundary on the client.
 */
declare interface DehydratedView {
    /**
     * The readonly hydration annotation data.
     */
    data: Readonly<SerializedView>;
    /**
     * A reference to the first child in a DOM segment associated
     * with a given hydration boundary.
     *
     * Once a view becomes hydrated, the value is set to `null`, which
     * indicates that further detaching/attaching view actions should result
     * in invoking corresponding DOM actions (attaching DOM nodes action is
     * skipped when we hydrate, since nodes are already in the DOM).
     */
    firstChild: RNode | null;
    /**
     * Stores references to first nodes in DOM segments that
     * represent either an <ng-container> or a view container.
     */
    segmentHeads?: {
        [index: number]: RNode | null;
    };
    /**
     * An instance of a Set that represents nodes disconnected from
     * the DOM tree at the serialization time, but otherwise present
     * in the internal data structures.
     *
     * The Set is based on the `SerializedView[DISCONNECTED_NODES]` data
     * and is needed to have constant-time lookups.
     *
     * If the value is `null`, it means that there were no disconnected
     * nodes detected in this view at serialization time.
     */
    disconnectedNodes?: Set<number> | null;
    /**
     * A mapping from a view to the first child to begin claiming nodes.
     *
     * This mapping is generated by an i18n block, and is the source of
     * truth for the nodes inside of it.
     */
    i18nNodes?: Map<number, RNode | null>;
    /**
     * A mapping from the index of an ICU node to dehydrated data for it.
     *
     * This information is used during the hydration process on the client.
     * ICU cases that were active during server-side rendering will be added
     * to the map. The hydration logic will "claim" matching cases, removing
     * them from the map. The remaining entries are "unclaimed", and will be
     * removed from the DOM during hydration cleanup.
     */
    dehydratedIcuData?: Map<number, DehydratedIcuData>;
}

/**
 * Describes the shape of a function generated by the compiler
 * to download dependencies that can be defer-loaded.
 */
declare type DependencyResolverFn = () => Array<Promise<DependencyType>>;

declare type DependencyType = ɵDirectiveType<any> | ɵComponentType<any> | PipeType<any> | Type<any>;

declare type DependencyTypeList = Array<DependencyType>;

/**
 * An implementation of DepsTrackerApi which will be used for JIT and local compilation.
 */
declare class DepsTracker implements DepsTrackerApi {
    private ownerNgModule;
    private ngModulesWithSomeUnresolvedDecls;
    private ngModulesScopeCache;
    private standaloneComponentsScopeCache;
    /**
     * Attempts to resolve ng module's forward ref declarations as much as possible and add them to
     * the `ownerNgModule` map. This method normally should be called after the initial parsing when
     * all the forward refs are resolved (e.g., when trying to render a component)
     */
    private resolveNgModulesDecls;
    /** @override */
    getComponentDependencies(type: ɵComponentType<any>, rawImports?: RawScopeInfoFromDecorator[]): ComponentDependencies;
    /**
     * @override
     * This implementation does not make use of param scopeInfo since it assumes the scope info is
     * already added to the type itself through methods like {@link ɵɵsetNgModuleScope}
     */
    registerNgModule(type: Type<any>, scopeInfo: NgModuleScopeInfoFromDecorator): void;
    /** @override */
    clearScopeCacheFor(type: Type<any>): void;
    /** @override */
    getNgModuleScope(type: ɵNgModuleType<any>): NgModuleScope;
    /** Compute NgModule scope afresh. */
    private computeNgModuleScope;
    /** @override */
    getStandaloneComponentScope(type: ɵComponentType<any>, rawImports?: RawScopeInfoFromDecorator[]): StandaloneComponentScope;
    private computeStandaloneComponentScope;
    /** @override */
    isOrphanComponent(cmp: Type<any>): boolean;
}

/**
 * Public API for runtime deps tracker (RDT).
 *
 * All downstream tools should only use these methods.
 */
declare interface DepsTrackerApi {
    /**
     * Computes the component dependencies, i.e., a set of components/directive/pipes that could be
     * present in the component's template (This set might contain directives/components/pipes not
     * necessarily used in the component's template depending on the implementation).
     *
     * Standalone components should specify `rawImports` as this information is not available from
     * their type. The consumer (e.g., {@link getStandaloneDefFunctions}) is expected to pass this
     * parameter.
     *
     * The implementation is expected to use some caching mechanism in order to optimize the resources
     * needed to do this computation.
     */
    getComponentDependencies(cmp: ɵComponentType<any>, rawImports?: (Type<any> | (() => Type<any>))[]): ComponentDependencies;
    /**
     * Registers an NgModule into the tracker with the given scope info.
     *
     * This method should be called for every NgModule whether it is compiled in local mode or not.
     * This is needed in order to compute component's dependencies as some dependencies might be in
     * different compilation units with different compilation mode.
     */
    registerNgModule(type: Type<any>, scopeInfo: NgModuleScopeInfoFromDecorator): void;
    /**
     * Clears the scope cache for NgModule or standalone component. This will force re-calculation of
     * the scope, which could be an expensive operation as it involves aggregating transitive closure.
     *
     * The main application of this method is for test beds where we want to clear the cache to
     * enforce scope update after overriding.
     */
    clearScopeCacheFor(type: Type<any>): void;
    /**
     * Returns the scope of NgModule. Mainly to be used by JIT and test bed.
     *
     * The scope value here is memoized. To enforce a new calculation bust the cache by using
     * `clearScopeCacheFor` method.
     */
    getNgModuleScope(type: ɵNgModuleType<any>): NgModuleScope;
    /**
     * Returns the scope of standalone component. Mainly to be used by JIT. This method should be
     * called lazily after the initial parsing so that all the forward refs can be resolved.
     *
     * @param rawImports the imports statement as appears on the component decorate which consists of
     *     Type as well as forward refs.
     *
     * The scope value here is memoized. To enforce a new calculation bust the cache by using
     * `clearScopeCacheFor` method.
     */
    getStandaloneComponentScope(type: ɵComponentType<any>, rawImports: (Type<any> | (() => Type<any>))[]): StandaloneComponentScope;
    /**
     * Checks if the NgModule declaring the component is not loaded into the browser yet. Always
     * returns false for standalone components.
     */
    isOrphanComponent(cmp: ɵComponentType<any>): boolean;
}

/**
 * Array of destroy hooks that should be executed for a view and their directive indices.
 *
 * The array is set up as a series of number/function or number/(number|function)[]:
 * - Even indices represent the context with which hooks should be called.
 * - Odd indices are the hook functions themselves. If a value at an odd index is an array,
 *   it represents the destroy hooks of a `multi` provider where:
 *     - Even indices represent the index of the provider for which we've registered a destroy hook,
 *       inside of the `multi` provider array.
 *     - Odd indices are the destroy hook functions.
 * For example:
 * LView: `[0, 1, 2, AService, 4, [BService, CService, DService]]`
 * destroyHooks: `[3, AService.ngOnDestroy, 5, [0, BService.ngOnDestroy, 2, DService.ngOnDestroy]]`
 *
 * In the example above `AService` is a type provider with an `ngOnDestroy`, whereas `BService`,
 * `CService` and `DService` are part of a `multi` provider where only `BService` and `DService`
 * have an `ngOnDestroy` hook.
 */
declare type DestroyHookData = (HookEntry | HookData)[];

/**
 * Destroys the current Angular platform and all Angular applications on the page.
 * Destroys all modules and listeners registered with the platform.
 *
 * @publicApi
 */
export declare function destroyPlatform(): void;

/**
 * `DestroyRef` lets you set callbacks to run for any cleanup or destruction behavior.
 * The scope of this destruction depends on where `DestroyRef` is injected. If `DestroyRef`
 * is injected in a component or directive, the callbacks run when that component or
 * directive is destroyed. Otherwise the callbacks run when a corresponding injector is destroyed.
 *
 * @publicApi
 */
export declare abstract class DestroyRef {
    /**
     * Registers a destroy callback in a given lifecycle scope.  Returns a cleanup function that can
     * be invoked to unregister the callback.
     *
     * @usageNotes
     * ### Example
     * ```ts
     * const destroyRef = inject(DestroyRef);
     *
     * // register a destroy callback
     * const unregisterFn = destroyRef.onDestroy(() => doSomethingOnDestroy());
     *
     * // stop the destroy callback from executing if needed
     * unregisterFn();
     * ```
     */
    abstract onDestroy(callback: () => void): () => void;
}

/**
 * Directive decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare interface Directive {
    /**
     * The CSS selector that identifies this directive in a template
     * and triggers instantiation of the directive.
     *
     * Declare as one of the following:
     *
     * - `element-name`: Select by element name.
     * - `.class`: Select by class name.
     * - `[attribute]`: Select by attribute name.
     * - `[attribute=value]`: Select by attribute name and value.
     * - `:not(sub_selector)`: Select only if the element does not match the `sub_selector`.
     * - `selector1, selector2`: Select if either `selector1` or `selector2` matches.
     *
     * Angular only allows directives to apply on CSS selectors that do not cross
     * element boundaries.
     *
     * For the following template HTML, a directive with an `input[type=text]` selector,
     * would be instantiated only on the `<input type="text">` element.
     *
     * ```html
     * <form>
     *   <input type="text">
     *   <input type="radio">
     * <form>
     * ```
     *
     */
    selector?: string;
    /**
     * Enumerates the set of data-bound input properties for a directive
     *
     * Angular automatically updates input properties during change detection.
     * The `inputs` property accepts either strings or object literals that configure the directive
     * properties that should be exposed as inputs.
     *
     * When an object literal is passed in, the `name` property indicates which property on the
     * class the input should write to, while the `alias` determines the name under
     * which the input will be available in template bindings. The `required` property indicates that
     * the input is required which will trigger a compile-time error if it isn't passed in when the
     * directive is used.
     *
     * When a string is passed into the `inputs` array, it can have a format of `'name'` or
     * `'name: alias'` where `name` is the property on the class that the directive should write
     * to, while the `alias` determines the name under which the input will be available in
     * template bindings. String-based input definitions are assumed to be optional.
     *
     * @usageNotes
     *
     * The following example creates a component with two data-bound properties.
     *
     * ```ts
     * @Component({
     *   selector: 'bank-account',
     *   inputs: ['bankName', {name: 'id', alias: 'account-id'}],
     *   template: `
     *     Bank Name: {{bankName}}
     *     Account Id: {{id}}
     *   `
     * })
     * class BankAccount {
     *   bankName: string;
     *   id: string;
     * }
     * ```
     *
     */
    inputs?: ({
        name: string;
        alias?: string;
        required?: boolean;
        transform?: (value: any) => any;
    } | string)[];
    /**
     * Enumerates the set of event-bound output properties.
     *
     * When an output property emits an event, an event handler attached to that event
     * in the template is invoked.
     *
     * The `outputs` property defines a set of `directiveProperty` to `alias`
     * configuration:
     *
     * - `directiveProperty` specifies the component property that emits events.
     * - `alias` specifies the DOM property the event handler is attached to.
     *
     * @usageNotes
     *
     * ```ts
     * @Component({
     *   selector: 'child-dir',
     *   outputs: [ 'bankNameChange' ],
     *   template: `<input (input)="bankNameChange.emit($event.target.value)" />`
     * })
     * class ChildDir {
     *  bankNameChange: EventEmitter<string> = new EventEmitter<string>();
     * }
     *
     * @Component({
     *   selector: 'main',
     *   template: `
     *     {{ bankName }} <child-dir (bankNameChange)="onBankNameChange($event)"></child-dir>
     *   `
     * })
     * class MainComponent {
     *  bankName: string;
     *
     *   onBankNameChange(bankName: string) {
     *     this.bankName = bankName;
     *   }
     * }
     * ```
     *
     */
    outputs?: string[];
    /**
     * Configures the injector of this
     * directive or component with a token
     * that maps to a provider of a dependency.
     */
    providers?: Provider[];
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * @usageNotes
     *
     * ```ts
     * @Directive({
     *   selector: 'child-dir',
     *   exportAs: 'child'
     * })
     * class ChildDir {
     * }
     *
     * @Component({
     *   selector: 'main',
     *   template: `<child-dir #c="child"></child-dir>`
     * })
     * class MainComponent {
     * }
     * ```
     *
     */
    exportAs?: string;
    /**
     * Configures the queries that will be injected into the directive.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * @usageNotes
     *
     * The following example shows how queries are defined
     * and when their results are available in lifecycle hooks:
     *
     * ```ts
     * @Component({
     *   selector: 'someDir',
     *   queries: {
     *     contentChildren: new ContentChildren(ChildDirective),
     *     viewChildren: new ViewChildren(ChildDirective)
     *   },
     *   template: '<child-directive></child-directive>'
     * })
     * class SomeDir {
     *   contentChildren: QueryList<ChildDirective>,
     *   viewChildren: QueryList<ChildDirective>
     *
     *   ngAfterContentInit() {
     *     // contentChildren is set
     *   }
     *
     *   ngAfterViewInit() {
     *     // viewChildren is set
     *   }
     * }
     * ```
     *
     * @Annotation
     */
    queries?: {
        [key: string]: any;
    };
    /**
     * Maps class properties to host element bindings for properties,
     * attributes, and events, using a set of key-value pairs.
     *
     * Angular automatically checks host property bindings during change detection.
     * If a binding changes, Angular updates the directive's host element.
     *
     * When the key is a property of the host element, the property value is
     * propagated to the specified DOM property.
     *
     * When the key is a static attribute in the DOM, the attribute value
     * is propagated to the specified property in the host element.
     *
     * For event handling:
     * - The key is the DOM event that the directive listens to.
     * To listen to global events, add the target to the event name.
     * The target can be `window`, `document` or `body`.
     * - The value is the statement to execute when the event occurs. If the
     * statement evaluates to `false`, then `preventDefault` is applied on the DOM
     * event. A handler method can refer to the `$event` local variable.
     *
     */
    host?: {
        [key: string]: string;
    };
    /**
     * When present, this directive/component is ignored by the AOT compiler.
     * It remains in distributed code, and the JIT compiler attempts to compile it
     * at run time, in the browser.
     * To ensure the correct behavior, the app must import `@angular/compiler`.
     */
    jit?: true;
    /**
     * Angular directives marked as `standalone` do not need to be declared in an NgModule. Such
     * directives don't depend on any "intermediate context" of an NgModule (ex. configured
     * providers).
     *
     * More information about standalone components, directives, and pipes can be found in [this
     * guide](guide/components/importing).
     */
    standalone?: boolean;
    /**
     * Standalone directives that should be applied to the host whenever the directive is matched.
     * By default, none of the inputs or outputs of the host directives will be available on the host,
     * unless they are specified in the `inputs` or `outputs` properties.
     *
     * You can additionally alias inputs and outputs by putting a colon and the alias after the
     * original input or output name. For example, if a directive applied via `hostDirectives`
     * defines an input named `menuDisabled`, you can alias this to `disabled` by adding
     * `'menuDisabled: disabled'` as an entry to `inputs`.
     */
    hostDirectives?: (Type<unknown> | {
        directive: Type<unknown>;
        inputs?: string[];
        outputs?: string[];
    })[];
}

/**
 * Type of the Directive metadata.
 *
 * @publicApi
 */
export declare const Directive: DirectiveDecorator;

/**
 * Partial metadata for a given directive instance.
 * This information might be useful for debugging purposes or tooling.
 * Currently only `inputs` and `outputs` metadata is available.
 *
 * @publicApi
 */
declare interface DirectiveDebugMetadata {
    inputs: Record<string, string>;
    outputs: Record<string, string>;
}

/**
 * Type of the Directive decorator / constructor function.
 * @publicApi
 */
export declare interface DirectiveDecorator {
    /**
     * Decorator that marks a class as an Angular directive.
     * You can define your own directives to attach custom behavior to elements in the DOM.
     *
     * The options provide configuration metadata that determines
     * how the directive should be processed, instantiated and used at
     * runtime.
     *
     * Directive classes, like component classes, can implement
     * [life-cycle hooks](guide/components/lifecycle) to influence their configuration and behavior.
     *
     *
     * @usageNotes
     * To define a directive, mark the class with the decorator and provide metadata.
     *
     * ```ts
     * import {Directive} from '@angular/core';
     *
     * @Directive({
     *   selector: 'my-directive',
     * })
     * export class MyDirective {
     * ...
     * }
     * ```
     *
     * ### Declaring directives
     *
     * In order to make a directive available to other components in your application, you should do
     * one of the following:
     *  - either mark the directive as [standalone](guide/components/importing),
     *  - or declare it in an NgModule by adding it to the `declarations` and `exports` fields.
     *
     * ** Marking a directive as standalone **
     *
     * You can add the `standalone: true` flag to the Directive decorator metadata to declare it as
     * [standalone](guide/components/importing):
     *
     * ```ts
     * @Directive({
     *   standalone: true,
     *   selector: 'my-directive',
     * })
     * class MyDirective {}
     * ```
     *
     * When marking a directive as standalone, please make sure that the directive is not already
     * declared in an NgModule.
     *
     *
     * ** Declaring a directive in an NgModule **
     *
     * Another approach is to declare a directive in an NgModule:
     *
     * ```ts
     * @Directive({
     *   selector: 'my-directive',
     * })
     * class MyDirective {}
     *
     * @NgModule({
     *   declarations: [MyDirective, SomeComponent],
     *   exports: [MyDirective], // making it available outside of this module
     * })
     * class SomeNgModule {}
     * ```
     *
     * When declaring a directive in an NgModule, please make sure that:
     *  - the directive is declared in exactly one NgModule.
     *  - the directive is not standalone.
     *  - you do not re-declare a directive imported from another module.
     *  - the directive is included into the `exports` field as well if you want this directive to be
     *    accessible for components outside of the NgModule.
     *
     *
     * @Annotation
     */
    (obj?: Directive): TypeDecorator;
    /**
     * See the `Directive` decorator.
     */
    new (obj?: Directive): Directive;
}

declare interface DirectiveDefFeature {
    <T>(directiveDef: ɵDirectiveDef<T>): void;
    /**
     * Marks a feature as something that {@link InheritDefinitionFeature} will execute
     * during inheritance.
     *
     * NOTE: DO NOT SET IN ROOT OF MODULE! Doing so will result in tree-shakers/bundlers
     * identifying the change as a side effect, and the feature will be included in
     * every bundle.
     */
    ngInherit?: true;
}

declare interface DirectiveDefinition<T> {
    /**
     * Directive type, needed to configure the injector.
     */
    type: Type<T>;
    /** The selectors that will be used to match nodes to this directive. */
    selectors?: ɵCssSelectorList;
    /**
     * A map of input names.
     */
    inputs?: DirectiveInputs<T>;
    /**
     * A map of output names.
     *
     * The format is in: `{[actualPropertyName: string]:string}`.
     *
     * Which the minifier may translate to: `{[minifiedPropertyName: string]:string}`.
     *
     * This allows the render to re-construct the minified and non-minified names
     * of properties.
     */
    outputs?: {
        [P in keyof T]?: string;
    };
    /**
     * A list of optional features to apply.
     *
     * See: {@link NgOnChangesFeature}, {@link ProvidersFeature}, {@link InheritDefinitionFeature}
     */
    features?: DirectiveDefFeature[];
    /**
     * Function executed by the parent template to allow child directive to apply host bindings.
     */
    hostBindings?: HostBindingsFunction<T>;
    /**
     * The number of bindings in this directive `hostBindings` (including pure fn bindings).
     *
     * Used to calculate the length of the component's LView array, so we
     * can pre-fill the array and set the host binding start index.
     */
    hostVars?: number;
    /**
     * Assign static attribute values to a host element.
     *
     * This property will assign static attribute values as well as class and style
     * values to a host element. Since attribute values can consist of different types of values,
     * the `hostAttrs` array must include the values in the following format:
     *
     * attrs = [
     *   // static attributes (like `title`, `name`, `id`...)
     *   attr1, value1, attr2, value,
     *
     *   // a single namespace value (like `x:id`)
     *   NAMESPACE_MARKER, namespaceUri1, name1, value1,
     *
     *   // another single namespace value (like `x:name`)
     *   NAMESPACE_MARKER, namespaceUri2, name2, value2,
     *
     *   // a series of CSS classes that will be applied to the element (no spaces)
     *   CLASSES_MARKER, class1, class2, class3,
     *
     *   // a series of CSS styles (property + value) that will be applied to the element
     *   STYLES_MARKER, prop1, value1, prop2, value2
     * ]
     *
     * All non-class and non-style attributes must be defined at the start of the list
     * first before all class and style values are set. When there is a change in value
     * type (like when classes and styles are introduced) a marker must be used to separate
     * the entries. The marker values themselves are set via entries found in the
     * [AttributeMarker] enum.
     */
    hostAttrs?: TAttributes;
    /**
     * Function to create instances of content queries associated with a given directive.
     */
    contentQueries?: ContentQueriesFunction<T>;
    /**
     * Additional set of instructions specific to view query processing. This could be seen as a
     * set of instructions to be inserted into the template function.
     */
    viewQuery?: ViewQueriesFunction<T> | null;
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * See: {@link Directive.exportAs}
     */
    exportAs?: string[];
    /**
     * Whether this directive/component is standalone.
     */
    standalone?: boolean;
    /**
     * Whether this directive/component is signal-based.
     */
    signals?: boolean;
}

declare type DirectiveDefList = (ɵDirectiveDef<any> | ɵComponentDef<any>)[];

/**
 * Type used for directiveDefs on component definition.
 *
 * The function is necessary to be able to support forward declarations.
 */
declare type DirectiveDefListOrFactory = (() => DirectiveDefList) | DirectiveDefList;

/**
 * Map of inputs for a given directive/component.
 *
 * Given:
 * ```ts
 * class MyComponent {
 *   @Input()
 *   publicInput1: string;
 *
 *   @Input('publicInput2')
 *   declaredInput2: string;
 *
 *   @Input({transform: (value: boolean) => value ? 1 : 0})
 *   transformedInput3: number;
 *
 *   signalInput = input(3);
 * }
 * ```
 *
 * is described as:
 * ```ts
 * {
 *   publicInput1: 'publicInput1',
 *   declaredInput2: [InputFlags.None, 'declaredInput2', 'publicInput2'],
 *   transformedInput3: [
 *     InputFlags.None,
 *     'transformedInput3',
 *     'transformedInput3',
 *     (value: boolean) => value ? 1 : 0
 *   ],
 *   signalInput: [InputFlags.SignalBased, "signalInput"],
 * }
 * ```
 *
 * Which the minifier may translate to:
 * ```ts
 * {
 *   minifiedPublicInput1: 'publicInput1',
 *   minifiedDeclaredInput2: [InputFlags.None, 'publicInput2', 'declaredInput2'],
 *   minifiedTransformedInput3: [
 *     InputFlags.None,
 *     'transformedInput3',
 *     'transformedInput3',
 *     (value: boolean) => value ? 1 : 0
 *   ],
 *   minifiedSignalInput: [InputFlags.SignalBased, "signalInput"],
 * }
 * ```
 *
 * This allows the render to re-construct the minified, public, and declared names
 * of properties.
 *
 * NOTE:
 *  - Because declared and public name are usually same we only generate the array
 *    `['declared', 'public']` format when they differ, or there is a transform.
 *  - The reason why this API and `outputs` API is not the same is that `NgOnChanges` has
 *    inconsistent behavior in that it uses declared names rather than minified or public.
 */
declare type DirectiveInputs<T> = {
    [P in keyof T]?: string | [
    flags: InputFlags,
    publicName: string,
    declaredName?: string,
    transform?: InputTransformFunction
    ];
};

declare const DISCONNECTED_NODES = "d";

/**
 * @description
 * Hook for manual bootstrapping of the application instead of using `bootstrap` array in @NgModule
 * annotation. This hook is invoked only when the `bootstrap` array is empty or not provided.
 *
 * Reference to the current application is provided as a parameter.
 *
 * See ["Bootstrapping"](guide/ngmodules/bootstrapping).
 *
 * @usageNotes
 * The example below uses `ApplicationRef.bootstrap()` to render the
 * `AppComponent` on the page.
 *
 * ```ts
 * class AppModule implements DoBootstrap {
 *   ngDoBootstrap(appRef: ApplicationRef) {
 *     appRef.bootstrap(AppComponent); // Or some other component
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export declare interface DoBootstrap {
    ngDoBootstrap(appRef: ApplicationRef): void;
}

/**
 * A lifecycle hook that invokes a custom change-detection function for a directive,
 * in addition to the check performed by the default change-detector.
 *
 * The default change-detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs. You can use this
 * hook to check for and respond to changes by some other means.
 *
 * When the default change detector detects changes, it invokes `ngOnChanges()` if supplied,
 * regardless of whether you perform additional change detection.
 * Typically, you should not use both `DoCheck` and `OnChanges` to respond to
 * changes on the same input.
 *
 * @see {@link OnChanges}
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface
 * to invoke it own change-detection cycle.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * For a more complete example and discussion, see
 * [Defining custom change detection](guide/components/lifecycle#defining-custom-change-detection).
 *
 * @publicApi
 */
export declare interface DoCheck {
    /**
     * A callback method that performs change-detection, invoked
     * after the default change-detector runs.
     * See `KeyValueDiffers` and `IterableDiffers` for implementing
     * custom change checking for collections.
     *
     */
    ngDoCheck(): void;
}

/**
 * Registers an "effect" that will be scheduled & executed whenever the signals that it reads
 * changes.
 *
 * Angular has two different kinds of effect: component effects and root effects. Component effects
 * are created when `effect()` is called from a component, directive, or within a service of a
 * component/directive. Root effects are created when `effect()` is called from outside the
 * component tree, such as in a root service, or when the `forceRoot` option is provided.
 *
 * The two effect types differ in their timing. Component effects run as a component lifecycle
 * event during Angular's synchronization (change detection) process, and can safely read input
 * signals or create/destroy views that depend on component state. Root effects run as microtasks
 * and have no connection to the component tree or change detection.
 *
 * `effect()` must be run in injection context, unless the `injector` option is manually specified.
 *
 * @developerPreview
 */
export declare function effect(effectFn: (onCleanup: EffectCleanupRegisterFn) => void, options?: CreateEffectOptions): EffectRef;

/**
 * An effect can, optionally, register a cleanup function. If registered, the cleanup is executed
 * before the next effect run. The cleanup function makes it possible to "cancel" any work that the
 * previous effect run might have started.
 *
 * @developerPreview
 */
export declare type EffectCleanupFn = () => void;

/**
 * A callback passed to the effect function that makes it possible to register cleanup logic.
 *
 * @developerPreview
 */
export declare type EffectCleanupRegisterFn = (cleanupFn: EffectCleanupFn) => void;

declare interface EffectNode extends ReactiveNode, SchedulableEffect {
    hasRun: boolean;
    cleanupFns: EffectCleanupFn[] | undefined;
    injector: Injector;
    notifier: ɵChangeDetectionScheduler;
    onDestroyFn: () => void;
    fn: (cleanupFn: EffectCleanupRegisterFn) => void;
    run(): void;
    destroy(): void;
    maybeCleanup(): void;
}

/**
 * A global reactive effect, which can be manually destroyed.
 *
 * @developerPreview
 */
export declare interface EffectRef {
    /**
     * Shut down the effect, removing it from any upcoming scheduled executions.
     */
    destroy(): void;
}

declare const EFFECTS = 23;

declare const EFFECTS_TO_SCHEDULE = 22;

/**
 * Keys within serialized view data structure to represent various
 * parts. See the `SerializedView` interface below for additional information.
 */
declare const ELEMENT_CONTAINERS = "e";

/**
 * Marks that the next string is an element name.
 *
 * See `I18nMutateOpCodes` documentation.
 */
declare const ELEMENT_MARKER: ELEMENT_MARKER;

declare interface ELEMENT_MARKER {
    marker: 'element';
}

/**
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */
export declare class ElementRef<T = any> {
    /**
     * <div class="callout is-critical">
     *   <header>Use with caution</header>
     *   <p>
     *    Use this API as the last resort when direct access to DOM is needed. Use templating and
     *    data-binding provided by Angular instead. Alternatively you can take a look at
     *    {@link Renderer2} which provides an API that can be safely used.
     *   </p>
     * </div>
     */
    nativeElement: T;
    constructor(nativeElement: T);
}

declare const EMBEDDED_VIEW_INJECTOR = 20;

/**
 * Represents an Angular view in a view container.
 * An embedded view can be referenced from a component
 * other than the hosting component whose template defines it, or it can be defined
 * independently by a `TemplateRef`.
 *
 * Properties of elements in a view can change, but the structure (number and order) of elements in
 * a view cannot. Change the structure of elements by inserting, moving, or
 * removing nested views in a view container.
 *
 * @see {@link ViewContainerRef}
 *
 * @usageNotes
 *
 * The following template breaks down into two separate `TemplateRef` instances,
 * an outer one and an inner one.
 *
 * ```html
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * This is the outer `TemplateRef`:
 *
 * ```html
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * This is the inner `TemplateRef`:
 *
 * ```html
 *   <li>{{item}}</li>
 * ```
 *
 * The outer and inner `TemplateRef` instances are assembled into views as follows:
 *
 * ```html
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * @publicApi
 */
export declare abstract class EmbeddedViewRef<C> extends ViewRef {
    /**
     * The context for this view, inherited from the anchor element.
     */
    abstract context: C;
    /**
     * The root nodes for this embedded view.
     */
    abstract get rootNodes(): any[];
}

/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * Using this method is discouraged as the Angular CLI will set production mode when using the
 * `optimization` option.
 * @see {@link cli/build ng build}
 *
 * @publicApi
 */
export declare function enableProdMode(): void;

declare const ENVIRONMENT = 10;

/**
 * A multi-provider token for initialization functions that will run upon construction of an
 * environment injector.
 *
 * @deprecated from v19.0.0, use provideEnvironmentInitializer instead
 *
 * @see {@link provideEnvironmentInitializer}
 *
 * Note: As opposed to the `APP_INITIALIZER` token, the `ENVIRONMENT_INITIALIZER` functions are not awaited,
 * hence they should not be `async`.
 *
 * @publicApi
 */
export declare const ENVIRONMENT_INITIALIZER: InjectionToken<readonly (() => void)[]>;

/**
 * An `Injector` that's part of the environment injector hierarchy, which exists outside of the
 * component tree.
 */
export declare abstract class EnvironmentInjector implements Injector {
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue: undefined, options: InjectOptions & {
        optional?: false;
    }): T;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue: null | undefined, options: InjectOptions): T | null;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions): T;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     * @deprecated use object-based flags (`InjectOptions`) instead.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    /**
     * @deprecated from v4.0.0 use ProviderToken<T>
     * @suppress {duplicate}
     */
    abstract get(token: any, notFoundValue?: any): any;
    /**
     * Runs the given function in the context of this `EnvironmentInjector`.
     *
     * Within the function's stack frame, [`inject`](api/core/inject) can be used to inject
     * dependencies from this injector. Note that `inject` is only usable synchronously, and cannot be
     * used in any asynchronous callbacks or after any `await` points.
     *
     * @param fn the closure to be run in the context of this injector
     * @returns the return value of the function, if any
     * @deprecated use the standalone function `runInInjectionContext` instead
     */
    abstract runInContext<ReturnT>(fn: () => ReturnT): ReturnT;
    abstract destroy(): void;
}

/**
 * Encapsulated `Provider`s that are only accepted during creation of an `EnvironmentInjector` (e.g.
 * in an `NgModule`).
 *
 * Using this wrapper type prevents providers which are only designed to work in
 * application/environment injectors from being accidentally included in
 * `@Component.providers` and ending up in a component injector.
 *
 * This wrapper type prevents access to the `Provider`s inside.
 *
 * @see {@link makeEnvironmentProviders}
 * @see {@link importProvidersFrom}
 *
 * @publicApi
 */
export declare type EnvironmentProviders = {
    ɵbrand: 'EnvironmentProviders';
};

/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * @usageNotes
 * ### Example
 *
 * ```ts
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * // Provide in standalone apps
 * bootstrapApplication(AppComponent, {
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 *
 * // Provide in module-based apps
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 * @publicApi
 */
export declare class ErrorHandler {
    handleError(error: any): void;
}

declare interface EventContractDetails {
    instance?: EventContract;
}

/**
 * Use in components with the `@Output` directive to emit custom events
 * synchronously or asynchronously, and register handlers for those events
 * by subscribing to an instance.
 *
 * @usageNotes
 *
 * Extends
 * [RxJS `Subject`](https://rxjs.dev/api/index/class/Subject)
 * for Angular by adding the `emit()` method.
 *
 * In the following example, a component defines two output properties
 * that create event emitters. When the title is clicked, the emitter
 * emits an open or close event to toggle the current visibility state.
 *
 * ```angular-ts
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * Access the event object with the `$event` argument passed to the output event
 * handler:
 *
 * ```html
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * @publicApi
 */
export declare interface EventEmitter<T> extends Subject<T>, OutputRef<T> {
    /**
     * Creates an instance of this class that can
     * deliver events synchronously or asynchronously.
     *
     * @param [isAsync=false] When true, deliver events asynchronously.
     *
     */
    new (isAsync?: boolean): EventEmitter<T>;
    /**
     * Emits an event containing a given value.
     * @param value The value to emit.
     */
    emit(value?: T): void;
    /**
     * Registers handlers for events emitted by this instance.
     * @param next When supplied, a custom handler for emitted events.
     * @param error When supplied, a custom handler for an error notification from this emitter.
     * @param complete When supplied, a custom handler for a completion notification from this
     *     emitter.
     */
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    /**
     * Registers handlers for events emitted by this instance.
     * @param observerOrNext When supplied, a custom handler for emitted events, or an observer
     *     object.
     * @param error When supplied, a custom handler for an error notification from this emitter.
     * @param complete When supplied, a custom handler for a completion notification from this
     *     emitter.
     */
    subscribe(observerOrNext?: any, error?: any, complete?: any): Subscription;
}

/**
 * @publicApi
 */
export declare const EventEmitter: {
    new (isAsync?: boolean): EventEmitter<any>;
    new <T>(isAsync?: boolean): EventEmitter<T>;
    readonly prototype: EventEmitter<any>;
};

/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='ExistingProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface ExistingProvider extends ExistingSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * @see {@link ExistingProvider}
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @publicApi
 */
export declare interface ExistingSansProvider {
    /**
     * Existing `token` to return. (Equivalent to `injector.get(useExisting)`)
     */
    useExisting: any;
}

declare type ExternalGlobalUtilsFunctions = keyof NgGlobalPublishUtils;

/**
 * Definition of what a factory function should look like.
 */
declare type FactoryFn<T> = {
    /**
     * Subclasses without an explicit constructor call through to the factory of their base
     * definition, providing it with their own constructor to instantiate.
     */
    <U extends T>(t?: Type<U>): U;
    /**
     * If no constructor to instantiate is provided, an instance of type T itself is created.
     */
    (t?: undefined): T;
};

/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='FactoryProvider'}
 *
 * Dependencies can also be marked as optional:
 *
 * {@example core/di/ts/provider_spec.ts region='FactoryProviderOptionalDeps'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface FactoryProvider extends FactorySansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * @see {@link FactoryProvider}
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @publicApi
 */
export declare interface FactorySansProvider {
    /**
     * A function to invoke to create a value for this `token`. The function is invoked with
     * resolved values of `token`s in the `deps` field.
     */
    useFactory: Function;
    /**
     * A list of `token`s to be resolved by the injector. The list of values is then
     * used as arguments to the `useFactory` function.
     */
    deps?: any[];
}

declare const FLAGS = 2;

/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared, but not yet defined. It is also used when the `token` which we use when creating
 * a query is not yet defined.
 *
 * `forwardRef` is also used to break circularities in standalone components imports.
 *
 * @usageNotes
 * ### Circular dependency example
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 *
 * ### Circular standalone reference import example
 * ```angular-ts
 * @Component({
 *   standalone: true,
 *   imports: [ChildComponent],
 *   selector: 'app-parent',
 *   template: `<app-child [hideParent]="hideParent"></app-child>`,
 * })
 * export class ParentComponent {
 *   @Input() hideParent: boolean;
 * }
 *
 *
 * @Component({
 *   standalone: true,
 *   imports: [CommonModule, forwardRef(() => ParentComponent)],
 *   selector: 'app-child',
 *   template: `<app-parent *ngIf="!hideParent"></app-parent>`,
 * })
 * export class ChildComponent {
 *   @Input() hideParent: boolean;
 * }
 * ```
 *
 * @publicApi
 */
export declare function forwardRef(forwardRefFn: ForwardRefFn): Type<any>;

/**
 * An interface that a function passed into `forwardRef` has to implement.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref_fn'}
 * @publicApi
 */
export declare interface ForwardRefFn {
    (): any;
}

/**
 * Retrieves the component instance associated with a given DOM element.
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <div>
 *     <child-comp></child-comp>
 *   </div>
 * </app-root>
 * ```
 *
 * Calling `getComponent` on `<child-comp>` will return the instance of `ChildComponent`
 * associated with this DOM element.
 *
 * Calling the function on `<app-root>` will return the `MyApp` instance.
 *
 *
 * @param element DOM element from which the component should be retrieved.
 * @returns Component instance associated with the element or `null` if there
 *    is no component associated with it.
 *
 * @publicApi
 */
declare function getComponent<T>(element: Element): T | null;

/**
 * If inside an embedded view (e.g. `*ngIf` or `*ngFor`), retrieves the context of the embedded
 * view that the element is part of. Otherwise retrieves the instance of the component whose view
 * owns the element (in this case, the result is the same as calling `getOwningComponent`).
 *
 * @param element Element for which to get the surrounding component instance.
 * @returns Instance of the component that is around the element or null if the element isn't
 *    inside any component.
 *
 * @publicApi
 */
declare function getContext<T extends {}>(element: Element): T | null;

/**
 * @publicApi
 */
declare function getDebugNode(nativeNode: any): DebugNode | null;
export { getDebugNode }
export { getDebugNode as ɵgetDebugNode }

/**
 * Gets all of the `@defer` blocks that are present inside the specified DOM node.
 * @param node Node in which to look for `@defer` blocks.
 *
 * @publicApi
 */
declare function getDeferBlocks(node: Node): DeferBlockData[];

/**
 * Discovers the dependencies of an injectable instance. Provides DI information about each
 * dependency that the injectable was instantiated with, including where they were provided from.
 *
 * @param injector An injector instance
 * @param token a DI token that was constructed by the given injector instance
 * @returns an object that contains the created instance of token as well as all of the dependencies
 * that it was instantiated with OR undefined if the token was not created within the given
 * injector.
 */
declare function getDependenciesFromInjectable<T>(injector: Injector, token: Type<T> | InjectionToken<T>): {
    instance: T;
    dependencies: Omit<InjectedService, 'injectedIn'>[];
} | undefined;

/**
 * Returns the debug (partial) metadata for a particular directive or component instance.
 * The function accepts an instance of a directive or component and returns the corresponding
 * metadata.
 *
 * @param directiveOrComponentInstance Instance of a directive or component
 * @returns metadata of the passed directive or component
 *
 * @publicApi
 */
declare function getDirectiveMetadata(directiveOrComponentInstance: any): ɵComponentDebugMetadata | DirectiveDebugMetadata | null;

/**
 * Retrieves an `Injector` associated with an element, component or directive instance.
 *
 * @param elementOrDir DOM element, component or directive instance for which to
 *    retrieve the injector.
 * @returns Injector associated with the element, component or directive instance.
 *
 * @publicApi
 */
declare function getInjector(elementOrDir: Element | {}): Injector;

/**
 *
 * Given an injector, this function will return
 * an object containing the type and source of the injector.
 *
 * |              | type        | source                                                      |
 * |--------------|-------------|-------------------------------------------------------------|
 * | NodeInjector | element     | DOM element that created this injector                      |
 * | R3Injector   | environment | `injector.source`                                           |
 * | NullInjector | null        | null                                                        |
 *
 * @param injector the Injector to get metadata for
 * @returns an object containing the type and source of the given injector. If the injector metadata
 *     cannot be determined, returns null.
 */
declare function getInjectorMetadata(injector: Injector): {
    type: 'element';
    source: RElement;
} | {
    type: 'environment';
    source: string | null;
} | {
    type: 'null';
    source: null;
} | null;

/**
 * Gets the providers configured on an injector.
 *
 * @param injector the injector to lookup the providers of
 * @returns ProviderRecord[] an array of objects representing the providers of the given injector
 */
declare function getInjectorProviders(injector: Injector): ɵProviderRecord[];

declare function getInjectorResolutionPath(injector: Injector): Injector[];

/**
 * Retrieves a list of event listeners associated with a DOM element. The list does include host
 * listeners, but it does not include event listeners defined outside of the Angular context
 * (e.g. through `addEventListener`).
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <div (click)="doSomething()"></div>
 * </app-root>
 * ```
 *
 * Calling `getListeners` on `<div>` will return an object that looks as follows:
 *
 * ```ts
 * {
 *   name: 'click',
 *   element: <div>,
 *   callback: () => doSomething(),
 *   useCapture: false
 * }
 * ```
 *
 * @param element Element for which the DOM listeners should be retrieved.
 * @returns Array of event listeners on the DOM element.
 *
 * @publicApi
 */
declare function getListeners(element: Element): Listener[];

/**
 * Returns the NgModuleFactory with the given id (specified using [@NgModule.id
 * field](api/core/NgModule#id)), if it exists and has been loaded. Factories for NgModules that do
 * not specify an `id` cannot be retrieved. Throws if an NgModule cannot be found.
 * @publicApi
 * @deprecated Use `getNgModuleById` instead.
 */
export declare function getModuleFactory(id: string): NgModuleFactory<any>;

/**
 * Returns the NgModule class with the given id (specified using [@NgModule.id
 * field](api/core/NgModule#id)), if it exists and has been loaded. Classes for NgModules that do
 * not specify an `id` cannot be retrieved. Throws if an NgModule cannot be found.
 * @publicApi
 */
export declare function getNgModuleById<T>(id: string): Type<T>;

/**
 * Retrieves the component instance whose view contains the DOM element.
 *
 * For example, if `<child-comp>` is used in the template of `<app-comp>`
 * (i.e. a `ViewChild` of `<app-comp>`), calling `getOwningComponent` on `<child-comp>`
 * would return `<app-comp>`.
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 * @returns Component instance whose view owns the DOM element or null if the element is not
 *    part of a component view.
 *
 * @publicApi
 */
declare function getOwningComponent<T>(elementOrDir: Element | {}): T | null;

/**
 * Returns the current platform.
 *
 * @publicApi
 */
export declare function getPlatform(): PlatformRef | null;

/**
 * Retrieves all root components associated with a DOM element, directive or component instance.
 * Root components are those which have been bootstrapped by Angular.
 *
 * @param elementOrDir DOM element, component or directive instance
 *    for which to retrieve the root components.
 * @returns Root components associated with the target object.
 *
 * @publicApi
 */
declare function getRootComponents(elementOrDir: Element | {}): {}[];

/**
 * Returns a debug representation of the signal graph for the given injector.
 *
 * Currently only supports element injectors. Starts by discovering the consumer nodes
 * and then traverses their producer nodes to build the signal graph.
 *
 * @param injector The injector to get the signal graph for.
 * @returns A debug representation of the signal graph.
 * @throws If the injector is an environment injector.
 */
declare function getSignalGraph(injector: Injector): DebugSignalGraph;

/**
 * Adapter interface for retrieving the `Testability` service associated for a
 * particular context.
 *
 * @publicApi
 */
export declare interface GetTestability {
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability | null;
}

/**
 * This value reflects the property on the window where the dev
 * tools are patched (window.ng).
 * */
declare const GLOBAL_PUBLISH_EXPANDO_KEY = "ng";

/**
 * The goal here is to make sure that the browser DOM API is the Renderer.
 * We do this by defining a subset of DOM API to be the renderer and then
 * use that at runtime for rendering.
 *
 * At runtime we can then use the DOM api directly, in server or web-worker
 * it will be easy to implement such API.
 */
declare type GlobalTargetName = 'document' | 'window' | 'body';

declare type GlobalTargetResolver = (element: any) => EventTarget;

declare const globalUtilsFunctions: {
    /**
     * Warning: functions that start with `ɵ` are considered *INTERNAL* and should not be relied upon
     * in application's code. The contract of those functions might be changed in any release and/or a
     * function can be removed completely.
     */
    ɵgetDependenciesFromInjectable: typeof getDependenciesFromInjectable;
    ɵgetInjectorProviders: typeof getInjectorProviders;
    ɵgetInjectorResolutionPath: typeof getInjectorResolutionPath;
    ɵgetInjectorMetadata: typeof getInjectorMetadata;
    ɵsetProfiler: (profiler: ɵProfiler_2 | null) => void;
    ɵgetSignalGraph: typeof getSignalGraph;
    ɵgetDeferBlocks: typeof getDeferBlocks;
    getDirectiveMetadata: typeof getDirectiveMetadata;
    getComponent: typeof getComponent;
    getContext: typeof getContext;
    getListeners: typeof getListeners;
    getOwningComponent: typeof getOwningComponent;
    getHostElement: typeof ɵgetHostElement;
    getInjector: typeof getInjector;
    getRootComponents: typeof getRootComponents;
    getDirectives: typeof ɵgetDirectives;
    applyChanges: typeof applyChanges;
    isSignal: typeof isSignal;
};

/**
 * Array of hooks that should be executed for a view and their directive indices.
 *
 * For each node of the view, the following data is stored:
 * 1) Node index (optional)
 * 2) A series of number/function pairs where:
 *  - even indices are directive indices
 *  - odd indices are hook functions
 *
 * Special cases:
 *  - a negative directive index flags an init hook (ngOnInit, ngAfterContentInit, ngAfterViewInit)
 */
declare type HookData = HookEntry[];

/**
 * Information necessary to call a hook. E.g. the callback that
 * needs to invoked and the index at which to find its context.
 */
declare type HookEntry = number | HookFn;

/** Single hook callback function. */
declare type HookFn = () => void;

declare const HOST = 0;

/**
 * Type of the Host metadata.
 *
 * @publicApi
 */
export declare interface Host {
}

/**
 * Host decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Host: HostDecorator;

/**
 * A token that can be used to inject the tag name of the host node.
 *
 * @usageNotes
 * ### Injecting a tag name that is known to exist
 * ```ts
 * @Directive()
 * class MyDir {
 *   tagName: string = inject(HOST_TAG_NAME);
 * }
 * ```
 *
 * ### Optionally injecting a tag name
 * ```ts
 * @Directive()
 * class MyDir {
 *   tagName: string | null = inject(HOST_TAG_NAME, {optional: true});
 * }
 * ```
 * @publicApi
 */
export declare const HOST_TAG_NAME: InjectionToken<string>;

/**
 * Creates a token that can be used to inject static attributes of the host node.
 *
 * @usageNotes
 * ### Injecting an attribute that is known to exist
 * ```ts
 * @Directive()
 * class MyDir {
 *   attr: string = inject(new HostAttributeToken('some-attr'));
 * }
 * ```
 *
 * ### Optionally injecting an attribute
 * ```ts
 * @Directive()
 * class MyDir {
 *   attr: string | null = inject(new HostAttributeToken('some-attr'), {optional: true});
 * }
 * ```
 * @publicApi
 */
export declare class HostAttributeToken {
    private attributeName;
    constructor(attributeName: string);
    toString(): string;
}

/**
 * Type of the HostBinding metadata.
 *
 * @publicApi
 */
export declare interface HostBinding {
    /**
     * The DOM property that is bound to a data property.
     * This field also accepts:
     *   * classes, prefixed by `class.`
     *   * styles, prefixed by `style.`
     *   * attributes, prefixed by `attr.`
     */
    hostPropertyName?: string;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const HostBinding: HostBindingDecorator;

/**
 * Type of the HostBinding decorator / constructor function.
 *
 * @publicApi
 */
export declare interface HostBindingDecorator {
    /**
     * Decorator that marks a DOM property or an element class, style or attribute as a host-binding
     * property and supplies configuration metadata. Angular automatically checks host bindings during
     * change detection, and if a binding changes it updates the host element of the directive.
     *
     * @usageNotes
     *
     * The following example creates a directive that sets the `valid` and `invalid`
     * class, a style color, and an id on the DOM element that has an `ngModel` directive on it.
     *
     * ```ts
     * @Directive({selector: '[ngModel]'})
     * class NgModelStatus {
     *   constructor(public control: NgModel) {}
     *   // class bindings
     *   @HostBinding('class.valid') get valid() { return this.control.valid; }
     *   @HostBinding('class.invalid') get invalid() { return this.control.invalid; }
     *
     *   // style binding
     *   @HostBinding('style.color') get color() { return this.control.valid ? 'green': 'red'; }
     *
     *   // style binding also supports a style unit extension
     *   @HostBinding('style.width.px') @Input() width: number = 500;
     *
     *   // attribute binding
     *   @HostBinding('attr.aria-required')
     *   @Input() required: boolean = false;
     *
     *   // property binding
     *   @HostBinding('id') get id() { return this.control.value?.length ? 'odd':  'even'; }
     *
     * @Component({
     *   selector: 'app',
     *   template: `<input [(ngModel)]="prop">`,
     * })
     * class App {
     *   prop;
     * }
     * ```
     *
     */
    (hostPropertyName?: string): any;
    new (hostPropertyName?: string): any;
}

/**
 * Stores a set of OpCodes to process `HostBindingsFunction` associated with a current view.
 *
 * In order to invoke `HostBindingsFunction` we need:
 * 1. 'elementIdx`: Index to the element associated with the `HostBindingsFunction`.
 * 2. 'directiveIdx`: Index to the directive associated with the `HostBindingsFunction`. (This will
 *    become the context for the `HostBindingsFunction` invocation.)
 * 3. `bindingRootIdx`: Location where the bindings for the `HostBindingsFunction` start. Internally
 *    `HostBindingsFunction` binding indexes start from `0` so we need to add `bindingRootIdx` to
 *    it.
 * 4. `HostBindingsFunction`: A host binding function to execute.
 *
 * The above information needs to be encoded into the `HostBindingOpCodes` in an efficient manner.
 *
 * 1. `elementIdx` is encoded into the `HostBindingOpCodes` as `~elementIdx` (so a negative number);
 * 2. `directiveIdx`
 * 3. `bindingRootIdx`
 * 4. `HostBindingsFunction` is passed in as is.
 *
 * The `HostBindingOpCodes` array contains:
 * - negative number to select the element index.
 * - followed by 1 or more of:
 *    - a number to select the directive index
 *    - a number to select the bindingRoot index
 *    - and a function to invoke.
 *
 * ## Example
 *
 * ```ts
 * const hostBindingOpCodes = [
 *   ~30,                               // Select element 30
 *   40, 45, MyDir.ɵdir.hostBindings    // Invoke host bindings on MyDir on element 30;
 *                                      // directiveIdx = 40; bindingRootIdx = 45;
 *   50, 55, OtherDir.ɵdir.hostBindings // Invoke host bindings on OtherDire on element 30
 *                                      // directiveIdx = 50; bindingRootIdx = 55;
 * ]
 * ```
 *
 * ## Pseudocode
 * ```ts
 * const hostBindingOpCodes = tView.hostBindingOpCodes;
 * if (hostBindingOpCodes === null) return;
 * for (let i = 0; i < hostBindingOpCodes.length; i++) {
 *   const opCode = hostBindingOpCodes[i] as number;
 *   if (opCode < 0) {
 *     // Negative numbers are element indexes.
 *     setSelectedIndex(~opCode);
 *   } else {
 *     // Positive numbers are NumberTuple which store bindingRootIndex and directiveIndex.
 *     const directiveIdx = opCode;
 *     const bindingRootIndx = hostBindingOpCodes[++i] as number;
 *     const hostBindingFn = hostBindingOpCodes[++i] as HostBindingsFunction<any>;
 *     setBindingRootForHostBindings(bindingRootIndx, directiveIdx);
 *     const context = lView[directiveIdx];
 *     hostBindingFn(RenderFlags.Update, context);
 *   }
 * }
 * ```
 *
 */
declare interface HostBindingOpCodes extends Array<number | HostBindingsFunction<any>> {
    __brand__: 'HostBindingOpCodes';
    debug?: string[];
}

declare type HostBindingsFunction<T> = <U extends T>(rf: ɵRenderFlags, ctx: U) => void;

/**
 * Type of the `Host` decorator / constructor function.
 *
 * @publicApi
 */
export declare interface HostDecorator {
    /**
     * Parameter decorator on a view-provider parameter of a class constructor
     * that tells the DI framework to resolve the view by checking injectors of child
     * elements, and stop when reaching the host element of the current component.
     *
     * @usageNotes
     *
     * The following shows use with the `@Optional` decorator, and allows for a `null` result.
     *
     * {@example core/di/ts/metadata_spec.ts region='Host'}
     *
     * For an extended example, see ["Dependency Injection
     * Guide"](guide/di/di-in-action#optional).
     */
    (): any;
    new (): Host;
}

/**
 * Mapping between the public aliases of directive bindings and the underlying inputs/outputs that
 * they represent. Also serves as an allowlist of the inputs/outputs from the host directive that
 * the author has decided to expose.
 */
declare type HostDirectiveBindingMap = {
    [publicName: string]: string;
};

/** Value that can be used to configure a host directive. */
declare type HostDirectiveConfig = Type<unknown> | {
    directive: Type<unknown>;
    inputs?: string[];
    outputs?: string[];
};

/** Runtime information used to configure a host directive. */
declare interface HostDirectiveDef<T = unknown> {
    /** Class representing the host directive. */
    directive: Type<T>;
    /** Directive inputs that have been exposed. */
    inputs: HostDirectiveBindingMap;
    /** Directive outputs that have been exposed. */
    outputs: HostDirectiveBindingMap;
}

/**
 * Mapping between a directive that was used as a host directive
 * and the configuration that was used to define it as such.
 */
declare type HostDirectiveDefs = Map<ɵDirectiveDef<unknown>, HostDirectiveDef>;

/**
 * Type of the HostListener metadata.
 *
 * @publicApi
 */
export declare interface HostListener {
    /**
     * The DOM event to listen for.
     */
    eventName?: string;
    /**
     * A set of arguments to pass to the handler method when the event occurs.
     */
    args?: string[];
}

/**
 * @Annotation
 * @publicApi
 */
export declare const HostListener: HostListenerDecorator;

/**
 * Type of the HostListener decorator / constructor function.
 *
 * @publicApi
 */
export declare interface HostListenerDecorator {
    /**
     * Decorator that declares a DOM event to listen for,
     * and provides a handler method to run when that event occurs.
     *
     * Angular invokes the supplied handler method when the host element emits the specified event,
     * and updates the bound element with the result.
     *
     * If the handler method returns false, applies `preventDefault` on the bound element.
     *
     * @usageNotes
     *
     * The following example declares a directive
     * that attaches a click listener to a button and counts clicks.
     *
     * ```ts
     * @Directive({selector: 'button[counting]'})
     * class CountClicks {
     *   numberOfClicks = 0;
     *
     *   @HostListener('click', ['$event.target'])
     *   onClick(btn) {
     *     console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: '<button counting>Increment</button>',
     * })
     * class App {}
     * ```
     *
     * The following example registers another DOM event handler that listens for `Enter` key-press
     * events on the global `window`.
     * ```ts
     * import { HostListener, Component } from "@angular/core";
     *
     * @Component({
     *   selector: 'app',
     *   template: `<h1>Hello, you have pressed enter {{counter}} number of times!</h1> Press enter
     * key to increment the counter. <button (click)="resetCounter()">Reset Counter</button>`
     * })
     * class AppComponent {
     *   counter = 0;
     *   @HostListener('window:keydown.enter', ['$event'])
     *   handleKeyDown(event: KeyboardEvent) {
     *     this.counter++;
     *   }
     *   resetCounter() {
     *     this.counter = 0;
     *   }
     * }
     * ```
     * The list of valid key names for `keydown` and `keyup` events
     * can be found here:
     * https://www.w3.org/TR/DOM-Level-3-Events-key/#named-key-attribute-values
     *
     * Note that keys can also be combined, e.g. `@HostListener('keydown.shift.a')`.
     *
     * The global target names that can be used to prefix an event name are
     * `document:`, `window:` and `body:`.
     *
     */
    (eventName: string, args?: string[]): any;
    new (eventName: string, args?: string[]): any;
}

/** * Describes specified delay (in ms) in the `hydrate on timer()` trigger. */
declare interface HydrateTimerTriggerDetails {
    delay: number;
}

/** * Describes all possible hydration trigger details specified in a template. */
declare type HydrateTriggerDetails = HydrateTimerTriggerDetails;

declare const HYDRATION = 6;

declare const HYDRATION_INFO_KEY = "__ngDebugHydrationInfo__";

/**
 * Internal type that represents a claimed node.
 * Only used in dev mode.
 */
declare enum HydrationStatus {
    Hydrated = "hydrated",
    Skipped = "skipped",
    Mismatched = "mismatched"
}

declare namespace i0 {
    export {
        ɵɵinject,
        ɵɵdefineInjectable,
        ɵɵdefineInjector,
        ɵɵInjectableDeclaration,
        ɵNgModuleDef as NgModuleDef,
        ɵɵdefineNgModule,
        ɵɵFactoryDeclaration,
        ɵɵInjectorDeclaration,
        ɵɵNgModuleDeclaration,
        ɵsetClassMetadata as setClassMetadata,
        ɵsetClassMetadataAsync as setClassMetadataAsync,
        ɵNgModuleFactory as NgModuleFactory,
        ɵnoSideEffects,
        ITS_JUST_ANGULAR
    }
}

declare const I18N_DATA = "l";

/**
 * Array storing OpCode for dynamically creating `i18n` translation DOM elements.
 *
 * This array creates a sequence of `Text` and `Comment` (as ICU anchor) DOM elements. It consists
 * of a pair of `number` and `string` pairs which encode the operations for the creation of the
 * translated block.
 *
 * The number is shifted and encoded according to `I18nCreateOpCode`
 *
 * Pseudocode:
 * ```ts
 * const i18nCreateOpCodes = [
 *   10 << I18nCreateOpCode.SHIFT, "Text Node add to DOM",
 *   11 << I18nCreateOpCode.SHIFT | I18nCreateOpCode.COMMENT, "Comment Node add to DOM",
 *   12 << I18nCreateOpCode.SHIFT | I18nCreateOpCode.APPEND_LATER, "Text Node added later"
 * ];
 *
 * for(var i=0; i<i18nCreateOpCodes.length; i++) {
 *   const opcode = i18NCreateOpCodes[i++];
 *   const index = opcode >> I18nCreateOpCode.SHIFT;
 *   const text = i18NCreateOpCodes[i];
 *   let node: Text|Comment;
 *   if (opcode & I18nCreateOpCode.COMMENT === I18nCreateOpCode.COMMENT) {
 *     node = lView[~index] = document.createComment(text);
 *   } else {
 *     node = lView[index] = document.createText(text);
 *   }
 *   if (opcode & I18nCreateOpCode.APPEND_EAGERLY !== I18nCreateOpCode.APPEND_EAGERLY) {
 *     parentNode.appendChild(node);
 *   }
 * }
 * ```
 */
declare interface I18nCreateOpCodes extends Array<number | string>, I18nDebug {
    __brand__: 'I18nCreateOpCodes';
}

declare interface I18nDebug {
    /**
     * Human readable representation of the OpCode arrays.
     *
     * NOTE: This property only exists if `ngDevMode` is set to `true` and it is not present in
     * production. Its presence is purely to help debug issue in development, and should not be relied
     * on in production application.
     */
    debug?: string[];
}

/**
 * Represents a simple DOM element in a translation, such as `<div>...</div>`
 */
declare interface I18nElementNode {
    /** The AST node kind */
    kind: I18nNodeKind.ELEMENT;
    /** The LView index */
    index: number;
    /** The child nodes */
    children: Array<I18nNode>;
}

/**
 * Represents an ICU in a translation.
 */
declare interface I18nICUNode {
    /** The AST node kind */
    kind: I18nNodeKind.ICU;
    /** The LView index */
    index: number;
    /** The branching cases */
    cases: Array<Array<I18nNode>>;
    /** The LView index that stores the active case */
    currentCaseLViewIndex: number;
}

declare type I18nNode = I18nTextNode | I18nElementNode | I18nICUNode | I18nPlaceholderNode;

declare const enum I18nNodeKind {
    TEXT = 0,
    ELEMENT = 1,
    PLACEHOLDER = 2,
    ICU = 3
}

/**
 * Represents special content that is embedded into the translation. This can
 * either be a special built-in element, such as <ng-container> and <ng-content>,
 * or it can be a sub-template, for example, from a structural directive.
 */
declare interface I18nPlaceholderNode {
    /** The AST node kind */
    kind: I18nNodeKind.PLACEHOLDER;
    /** The LView index */
    index: number;
    /** The child nodes */
    children: Array<I18nNode>;
    /** The placeholder type */
    type: I18nPlaceholderType;
}

declare const enum I18nPlaceholderType {
    ELEMENT = 0,
    SUBTEMPLATE = 1
}

/**
 * Stores a list of nodes which need to be removed.
 *
 * Numbers are indexes into the `LView`
 * - index > 0: `removeRNode(lView[0])`
 * - index < 0: `removeICU(~lView[0])`
 */
declare interface I18nRemoveOpCodes extends Array<number> {
    __brand__: 'I18nRemoveOpCodes';
}

/**
 * Represents a block of text in a translation, such as `Hello, {{ name }}!`.
 */
declare interface I18nTextNode {
    /** The AST node kind */
    kind: I18nNodeKind.TEXT;
    /** The LView index */
    index: number;
}

/**
 * Stores DOM operations which need to be applied to update DOM render tree due to changes in
 * expressions.
 *
 * The basic idea is that `i18nExp` OpCodes capture expression changes and update a change
 * mask bit. (Bit 1 for expression 1, bit 2 for expression 2 etc..., bit 32 for expression 32 and
 * higher.) The OpCodes then compare its own change mask against the expression change mask to
 * determine if the OpCodes should execute.
 *
 * NOTE: 32nd bit is special as it says 32nd or higher. This way if we have more than 32 bindings
 * the code still works, but with lower efficiency. (it is unlikely that a translation would have
 * more than 32 bindings.)
 *
 * These OpCodes can be used by both the i18n block as well as ICU sub-block.
 *
 * ## Example
 *
 * Assume
 * ```ts
 *   if (rf & RenderFlags.Update) {
 *    i18nExp(ctx.exp1); // If changed set mask bit 1
 *    i18nExp(ctx.exp2); // If changed set mask bit 2
 *    i18nExp(ctx.exp3); // If changed set mask bit 3
 *    i18nExp(ctx.exp4); // If changed set mask bit 4
 *    i18nApply(0);            // Apply all changes by executing the OpCodes.
 *  }
 * ```
 * We can assume that each call to `i18nExp` sets an internal `changeMask` bit depending on the
 * index of `i18nExp`.
 *
 * ### OpCodes
 * ```ts
 * <I18nUpdateOpCodes>[
 *   // The following OpCodes represent: `<div i18n-title="pre{{exp1}}in{{exp2}}post">`
 *   // If `changeMask & 0b11`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `8` values and start processing next OpCodes.
 *   0b11, 8,
 *   // Concatenate `newValue = 'pre'+lView[bindIndex-4]+'in'+lView[bindIndex-3]+'post';`.
 *   'pre', -4, 'in', -3, 'post',
 *   // Update attribute: `elementAttribute(1, 'title', sanitizerFn(newValue));`
 *   1 << SHIFT_REF | Attr, 'title', sanitizerFn,
 *
 *   // The following OpCodes represent: `<div i18n>Hello {{exp3}}!">`
 *   // If `changeMask & 0b100`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `4` values and start processing next OpCodes.
 *   0b100, 4,
 *   // Concatenate `newValue = 'Hello ' + lView[bindIndex -2] + '!';`.
 *   'Hello ', -2, '!',
 *   // Update text: `lView[1].textContent = newValue;`
 *   1 << SHIFT_REF | Text,
 *
 *   // The following OpCodes represent: `<div i18n>{exp4, plural, ... }">`
 *   // If `changeMask & 0b1000`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `2` values and start processing next OpCodes.
 *   0b1000, 2,
 *   // Concatenate `newValue = lView[bindIndex -1];`.
 *   -1,
 *   // Switch ICU: `icuSwitchCase(lView[1], 0, newValue);`
 *   0 << SHIFT_ICU | 1 << SHIFT_REF | IcuSwitch,
 *
 *   // Note `changeMask & -1` is always true, so the IcuUpdate will always execute.
 *   -1, 1,
 *   // Update ICU: `icuUpdateCase(lView[1], 0);`
 *   0 << SHIFT_ICU | 1 << SHIFT_REF | IcuUpdate,
 *
 * ];
 * ```
 *
 */
declare interface I18nUpdateOpCodes extends Array<string | number | SanitizerFn | null>, I18nDebug {
    __brand__: 'I18nUpdateOpCodes';
}

/**
 * Marks that the next string is comment text need for ICU.
 *
 * See `I18nMutateOpCodes` documentation.
 */
declare const ICU_MARKER: ICU_MARKER;

declare interface ICU_MARKER {
    marker: 'ICU';
}

/**
 * Array storing OpCode for dynamically creating `i18n` blocks.
 *
 * Example:
 * ```ts
 * <I18nCreateOpCode>[
 *   // For adding text nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   lView[1].appendChild(lView[0] = document.createTextNode('xyz'));
 *   'xyz', 0, 1 << SHIFT_PARENT | 0 << SHIFT_REF | AppendChild,
 *
 *   // For adding element nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   lView[1].appendChild(lView[0] = document.createElement('div'));
 *   ELEMENT_MARKER, 'div', 0, 1 << SHIFT_PARENT | 0 << SHIFT_REF | AppendChild,
 *
 *   // For adding comment nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   lView[1].appendChild(lView[0] = document.createComment(''));
 *   ICU_MARKER, '', 0, 1 << SHIFT_PARENT | 0 << SHIFT_REF | AppendChild,
 *
 *   // For moving existing nodes to a different location
 *   // --------------------------------------------------
 *   // Equivalent to:
 *   //   const node = lView[1];
 *   //   lView[2].appendChild(node);
 *   1 << SHIFT_REF | Select, 2 << SHIFT_PARENT | 0 << SHIFT_REF | AppendChild,
 *
 *   // For removing existing nodes
 *   // --------------------------------------------------
 *   //   const node = lView[1];
 *   //   removeChild(tView.data(1), node, lView);
 *   1 << SHIFT_REF | Remove,
 *
 *   // For writing attributes
 *   // --------------------------------------------------
 *   //   const node = lView[1];
 *   //   node.setAttribute('attr', 'value');
 *   1 << SHIFT_REF | Attr, 'attr', 'value'
 * ];
 * ```
 */
declare interface IcuCreateOpCodes extends Array<number | string | ELEMENT_MARKER | ICU_MARKER | null>, I18nDebug {
    __brand__: 'I18nCreateOpCodes';
}

/**
 * Defines the ICU type of `select` or `plural`
 */
declare const enum IcuType {
    select = 0,
    plural = 1
}

declare const ID = 19;

/**
 * Providers that were imported from NgModules via the `importProvidersFrom` function.
 *
 * These providers are meant for use in an application injector (or other environment injectors) and
 * should not be used in component injectors.
 *
 * This type cannot be directly implemented. It's returned from the `importProvidersFrom` function
 * and serves to prevent the extracted NgModule providers from being used in the wrong contexts.
 *
 * @see {@link importProvidersFrom}
 *
 * @publicApi
 * @deprecated replaced by `EnvironmentProviders`
 */
export declare type ImportedNgModuleProviders = EnvironmentProviders;

/**
 * Collects providers from all NgModules and standalone components, including transitively imported
 * ones.
 *
 * Providers extracted via `importProvidersFrom` are only usable in an application injector or
 * another environment injector (such as a route injector). They should not be used in component
 * providers.
 *
 * More information about standalone components can be found in [this
 * guide](guide/components/importing).
 *
 * @usageNotes
 * The results of the `importProvidersFrom` call can be used in the `bootstrapApplication` call:
 *
 * ```ts
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     importProvidersFrom(NgModuleOne, NgModuleTwo)
 *   ]
 * });
 * ```
 *
 * You can also use the `importProvidersFrom` results in the `providers` field of a route, when a
 * standalone component is used:
 *
 * ```ts
 * export const ROUTES: Route[] = [
 *   {
 *     path: 'foo',
 *     providers: [
 *       importProvidersFrom(NgModuleOne, NgModuleTwo)
 *     ],
 *     component: YourStandaloneComponent
 *   }
 * ];
 * ```
 *
 * @returns Collected providers from the specified list of types.
 * @publicApi
 */
export declare function importProvidersFrom(...sources: ImportProvidersSource[]): EnvironmentProviders;

/**
 * A source of providers for the `importProvidersFrom` function.
 *
 * @publicApi
 */
export declare type ImportProvidersSource = Type<unknown> | ModuleWithProviders<unknown> | Array<ImportProvidersSource>;

/**
 * This array contains information about input properties that
 * need to be set once from attribute data. It's ordered by
 * directive index (relative to element) so it's simple to
 * look up a specific directive's initial input data.
 *
 * Within each sub-array:
 *
 * i+0: attribute name
 * i+1: minified/internal input name
 * i+2: initial value
 *
 * If a directive on a node does not have any input properties
 * that should be set from attributes, its index is set to null
 * to avoid a sparse array.
 *
 * e.g. [null, ['role-min', 'minified-input', 'button']]
 */
declare type InitialInputData = (InitialInputs | null)[];

/**
 * Used by InitialInputData to store input properties
 * that should be set once from attributes.
 *
 * i+0: attribute name
 * i+1: minified/internal input name
 * i+2: input flags
 * i+3: initial value
 *
 * e.g. ['role-min', 'minified-input', 'button']
 */
declare type InitialInputs = (string | InputFlags)[];

/**
 * Type of the Inject metadata.
 *
 * @publicApi
 */
export declare interface Inject {
    /**
     * A DI token that maps to the dependency to be injected.
     */
    token: any;
}

/**
 * Inject decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Inject: InjectDecorator;

/**
 * @param token A token that represents a dependency that should be injected.
 * @returns the injected value if operation is successful, `null` otherwise.
 * @throws if called outside of a supported context.
 *
 * @publicApi
 */
export declare function inject<T>(token: ProviderToken<T>): T;

/**
 * @param token A token that represents a dependency that should be injected.
 * @param flags Control how injection is executed. The flags correspond to injection strategies that
 *     can be specified with parameter decorators `@Host`, `@Self`, `@SkipSelf`, and `@Optional`.
 * @returns the injected value if operation is successful, `null` otherwise.
 * @throws if called outside of a supported context.
 *
 * @publicApi
 * @deprecated prefer an options object instead of `InjectFlags`
 */
export declare function inject<T>(token: ProviderToken<T>, flags?: InjectFlags): T | null;

/**
 * @param token A token that represents a dependency that should be injected.
 * @param options Control how injection is executed. Options correspond to injection strategies
 *     that can be specified with parameter decorators `@Host`, `@Self`, `@SkipSelf`, and
 *     `@Optional`.
 * @returns the injected value if operation is successful.
 * @throws if called outside of a supported context, or if the token is not found.
 *
 * @publicApi
 */
export declare function inject<T>(token: ProviderToken<T>, options: InjectOptions & {
    optional?: false;
}): T;

/**
 * @param token A token that represents a dependency that should be injected.
 * @param options Control how injection is executed. Options correspond to injection strategies
 *     that can be specified with parameter decorators `@Host`, `@Self`, `@SkipSelf`, and
 *     `@Optional`.
 * @returns the injected value if operation is successful,  `null` if the token is not
 *     found and optional injection has been requested.
 * @throws if called outside of a supported context, or if the token is not found and optional
 *     injection was not requested.
 *
 * @publicApi
 */
export declare function inject<T>(token: ProviderToken<T>, options: InjectOptions): T | null;

/**
 * @param token A token that represents a static attribute on the host node that should be injected.
 * @returns Value of the attribute if it exists.
 * @throws If called outside of a supported context or the attribute does not exist.
 *
 * @publicApi
 */
export declare function inject(token: HostAttributeToken): string;

/**
 * @param token A token that represents a static attribute on the host node that should be injected.
 * @returns Value of the attribute if it exists, otherwise `null`.
 * @throws If called outside of a supported context.
 *
 * @publicApi
 */
export declare function inject(token: HostAttributeToken, options: {
    optional: true;
}): string | null;

/**
 * @param token A token that represents a static attribute on the host node that should be injected.
 * @returns Value of the attribute if it exists.
 * @throws If called outside of a supported context or the attribute does not exist.
 *
 * @publicApi
 */
export declare function inject(token: HostAttributeToken, options: {
    optional: false;
}): string;

/**
 * Type of the Injectable metadata.
 *
 * @publicApi
 */
export declare interface Injectable {
    /**
     * Determines which injectors will provide the injectable.
     *
     * - `Type<any>` - associates the injectable with an `@NgModule` or other `InjectorType`. This
     * option is DEPRECATED.
     * - 'null' : Equivalent to `undefined`. The injectable is not provided in any scope automatically
     * and must be added to a `providers` array of an [@NgModule](api/core/NgModule#providers),
     * [@Component](api/core/Directive#providers) or [@Directive](api/core/Directive#providers).
     *
     * The following options specify that this injectable should be provided in one of the following
     * injectors:
     * - 'root' : The application-level injector in most apps.
     * - 'platform' : A special singleton platform injector shared by all
     * applications on the page.
     * - 'any' : Provides a unique instance in each lazy loaded module while all eagerly loaded
     * modules share one instance. This option is DEPRECATED.
     *
     */
    providedIn?: Type<any> | 'root' | 'platform' | 'any' | null;
}

/**
 * Injectable decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Injectable: InjectableDecorator;

/**
 * Type of the Injectable decorator / constructor function.
 *
 * @publicApi
 */
export declare interface InjectableDecorator {
    /**
     * Decorator that marks a class as available to be
     * provided and injected as a dependency.
     *
     * @see [Introduction to Services and DI](guide/di)
     * @see [Dependency Injection Guide](guide/di/dependency-injection
     *
     * @usageNotes
     *
     * Marking a class with `@Injectable` ensures that the compiler
     * will generate the necessary metadata to create the class's
     * dependencies when the class is injected.
     *
     * The following example shows how a service class is properly
     *  marked so that a supporting service can be injected upon creation.
     *
     * {@example core/di/ts/metadata_spec.ts region='Injectable'}
     *
     */
    (): TypeDecorator;
    (options?: {
        providedIn: Type<any> | 'root' | 'platform' | 'any' | null;
    } & InjectableProvider): TypeDecorator;
    new (): Injectable;
    new (options?: {
        providedIn: Type<any> | 'root' | 'platform' | 'any' | null;
    } & InjectableProvider): Injectable;
}

/**
 * Injectable providers used in `@Injectable` decorator.
 *
 * @publicApi
 */
export declare type InjectableProvider = ValueSansProvider | ExistingSansProvider | StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;

/**
 * A `Type` which has a `ɵprov: ɵɵInjectableDeclaration` static field.
 *
 * `InjectableType`s contain their own Dependency Injection metadata and are usable in an
 * `InjectorDef`-based `StaticInjector`.
 *
 * @publicApi
 */
export declare interface InjectableType<T> extends Type<T> {
    /**
     * Opaque type whose structure is highly version dependent. Do not rely on any properties.
     */
    ɵprov: unknown;
}


/**
 * Type of the Inject decorator / constructor function.
 *
 * @publicApi
 */
export declare interface InjectDecorator {
    /**
     * Parameter decorator on a dependency parameter of a class constructor
     * that specifies a custom provider of the dependency.
     *
     * @usageNotes
     * The following example shows a class constructor that specifies a
     * custom provider of a dependency using the parameter decorator.
     *
     * When `@Inject()` is not present, the injector uses the type annotation of the
     * parameter as the provider.
     *
     * {@example core/di/ts/metadata_spec.ts region='InjectWithoutDecorator'}
     *
     * @see [Dependency Injection Guide](guide/di/dependency-injection
     *
     */
    (token: any): any;
    new (token: any): Inject;
}

/**
 * An object that contains information a service that has been injected within an
 * InjectorProfilerContext
 */
declare interface InjectedService {
    /**
     * DI token of the Service that is injected
     */
    token?: Type<unknown> | InjectionToken<unknown>;
    /**
     * Value of the injected service
     */
    value: unknown;
    /**
     * Flags that this service was injected with
     */
    flags?: InternalInjectFlags | InjectFlags | InjectOptions;
    /**
     * Injector that this service was provided in.
     */
    providedIn?: Injector;
    /**
     * In NodeInjectors, the LView and TNode that serviced this injection.
     */
    injectedIn?: {
        lView: LView;
        tNode: TNode;
    };
}

/**
 * Injection flags for DI.
 *
 * @publicApi
 * @deprecated use an options object for [`inject`](api/core/inject) instead.
 */
export declare enum InjectFlags {
    /** Check self and check parent injector if needed */
    Default = 0,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 1,
    /** Don't ascend to ancestors of the node requesting injection. */
    Self = 2,
    /** Skip the node that is requesting injection. */
    SkipSelf = 4,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 8
}

/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parameterized type.
 *
 * `InjectionToken` is parameterized on `T` which is the type of object which will be returned by
 * the `Injector`. This provides an additional level of type safety.
 *
 * <div class="docs-alert docs-alert-helpful">
 *
 * **Important Note**: Ensure that you use the same instance of the `InjectionToken` in both the
 * provider and the injection call. Creating a new instance of `InjectionToken` in different places,
 * even with the same description, will be treated as different tokens by Angular's DI system,
 * leading to a `NullInjectorError`.
 *
 * </div>
 *
 * {@example injection-token/src/main.ts region='InjectionToken'}
 *
 * When creating an `InjectionToken`, you can optionally specify a factory function which returns
 * (possibly by creating) a default value of the parameterized type `T`. This sets up the
 * `InjectionToken` using this factory as a provider as if it was defined explicitly in the
 * application's root injector. If the factory function, which takes zero arguments, needs to inject
 * dependencies, it can do so using the [`inject`](api/core/inject) function.
 * As you can see in the Tree-shakable InjectionToken example below.
 *
 * Additionally, if a `factory` is specified you can also specify the `providedIn` option, which
 * overrides the above behavior and marks the token as belonging to a particular `@NgModule` (note:
 * this option is now deprecated). As mentioned above, `'root'` is the default value for
 * `providedIn`.
 *
 * The `providedIn: NgModule` and `providedIn: 'any'` options are deprecated.
 *
 * @usageNotes
 * ### Basic Examples
 *
 * ### Plain InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='InjectionToken'}
 *
 * ### Tree-shakable InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 * @publicApi
 */
export declare class InjectionToken<T> {
    protected _desc: string;
    readonly ɵprov: unknown;
    /**
     * @param _desc   Description for the token,
     *                used only for debugging purposes,
     *                it should but does not need to be unique
     * @param options Options for the token's usage, as described above
     */
    constructor(_desc: string, options?: {
        providedIn?: Type<any> | 'root' | 'platform' | 'any' | null;
        factory: () => T;
    });
    toString(): string;
}

/**
 * Type of the options argument to [`inject`](api/core/inject).
 *
 * @publicApi
 */
export declare interface InjectOptions {
    /**
     * Use optional injection, and return `null` if the requested token is not found.
     */
    optional?: boolean;
    /**
     * Start injection at the parent of the current injector.
     */
    skipSelf?: boolean;
    /**
     * Only query the current injector for the token, and don't fall back to the parent injector if
     * it's not found.
     */
    self?: boolean;
    /**
     * Stop injection at the host component's injector. Only relevant when injecting from an element
     * injector, and a no-op for environment injectors.
     */
    host?: boolean;
}

/**
 * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
 *
 * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
 * project.
 *
 * @publicApi
 */
export declare const INJECTOR: InjectionToken<Injector>;

/**
 * Concrete injectors implement this interface. Injectors are configured
 * with [providers](guide/di/dependency-injection-providers) that associate
 * dependencies of various types with [injection tokens](guide/di/dependency-injection-providers).
 *
 * @see [DI Providers](guide/di/dependency-injection-providers).
 * @see {@link StaticProvider}
 *
 * @usageNotes
 *
 *  The following example creates a service injector instance.
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Usage example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @publicApi
 */
export declare abstract class Injector {
    static THROW_IF_NOT_FOUND: {};
    static NULL: Injector;
    /**
     * Internal note on the `options?: InjectOptions|InjectFlags` override of the `get`
     * method: consider dropping the `InjectFlags` part in one of the major versions.
     * It can **not** be done in minor/patch, since it's breaking for custom injectors
     * that only implement the old `InjectorFlags` interface.
     */
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue: undefined, options: InjectOptions & {
        optional?: false;
    }): T;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue: null | undefined, options: InjectOptions): T | null;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions | InjectFlags): T;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     * @deprecated use object-based flags (`InjectOptions`) instead.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    /**
     * @deprecated from v4.0.0 use ProviderToken<T>
     * @suppress {duplicate}
     */
    abstract get(token: any, notFoundValue?: any): any;
    /**
     * @deprecated from v5 use the new signature Injector.create(options)
     */
    static create(providers: StaticProvider[], parent?: Injector): Injector;
    /**
     * Creates a new injector instance that provides one or more dependencies,
     * according to a given type or types of `StaticProvider`.
     *
     * @param options An object with the following properties:
     * * `providers`: An array of providers of the [StaticProvider type](api/core/StaticProvider).
     * * `parent`: (optional) A parent injector.
     * * `name`: (optional) A developer-defined identifying name for the new injector.
     *
     * @returns The new injector instance.
     *
     */
    static create(options: {
        providers: Array<Provider | StaticProvider>;
        parent?: Injector;
        name?: string;
    }): Injector;
    /** @nocollapse */
    static ɵprov: unknown;
}

declare const INJECTOR_2 = 9;

declare type InjectorScope = 'root' | 'platform' | 'environment';

/**
 * A type which has an `InjectorDef` static field.
 *
 * `InjectorTypes` can be used to configure a `StaticInjector`.
 *
 * This is an opaque type whose structure is highly version dependent. Do not rely on any
 * properties.
 *
 * @publicApi
 */
export declare interface InjectorType<T> extends Type<T> {
    ɵfac?: unknown;
    ɵinj: unknown;
}

/**
 * Describes the `InjectorDef` equivalent of a `ModuleWithProviders`, an `InjectorType` with an
 * associated array of providers.
 *
 * Objects of this type can be listed in the imports section of an `InjectorDef`.
 *
 * NOTE: This is a private type and should not be exported
 */
declare interface InjectorTypeWithProviders<T> {
    ngModule: InjectorType<T>;
    providers?: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | EnvironmentProviders | any[])[];
}

/**
 * Type of metadata for an `Input` property.
 *
 * @publicApi
 */
export declare interface Input {
    /**
     * The name of the DOM property to which the input property is bound.
     */
    alias?: string;
    /**
     * Whether the input is required for the directive to function.
     */
    required?: boolean;
    /**
     * Function with which to transform the input value before assigning it to the directive instance.
     */
    transform?: (value: any) => any;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const Input: InputDecorator;

/**
 * The `input` function allows declaration of Angular inputs in directives
 * and components.
 *
 * There are two variants of inputs that can be declared:
 *
 *   1. **Optional inputs** with an initial value.
 *   2. **Required inputs** that consumers need to set.
 *
 * By default, the `input` function will declare optional inputs that
 * always have an initial value. Required inputs can be declared
 * using the `input.required()` function.
 *
 * Inputs are signals. The values of an input are exposed as a `Signal`.
 * The signal always holds the latest value of the input that is bound
 * from the parent.
 *
 * @usageNotes
 * To use signal-based inputs, import `input` from `@angular/core`.
 *
 * ```ts
 * import {input} from '@angular/core`;
 * ```
 *
 * Inside your component, introduce a new class member and initialize
 * it with a call to `input` or `input.required`.
 *
 * ```ts
 * @Component({
 *   ...
 * })
 * export class UserProfileComponent {
 *   firstName = input<string>();             // Signal<string|undefined>
 *   lastName  = input.required<string>();    // Signal<string>
 *   age       = input(0)                     // Signal<number>
 * }
 * ```
 *
 * Inside your component template, you can display values of the inputs
 * by calling the signal.
 *
 * ```html
 * <span>{{firstName()}}</span>
 * ```
 *
 * @publicAPI
 * @initializerApiFunction
 */
export declare const input: InputFunction;

/**
 * @publicApi
 */
export declare interface InputDecorator {
    /**
     * Decorator that marks a class field as an input property and supplies configuration metadata.
     * The input property is bound to a DOM property in the template. During change detection,
     * Angular automatically updates the data property with the DOM property's value.
     *
     * @usageNotes
     *
     * You can supply an optional name to use in templates when the
     * component is instantiated, that maps to the
     * name of the bound property. By default, the original
     * name of the bound property is used for input binding.
     *
     * The following example creates a component with two input properties,
     * one of which is given a special binding name.
     *
     * ```ts
     * import { Component, Input, numberAttribute, booleanAttribute } from '@angular/core';
     * @Component({
     *   selector: 'bank-account',
     *   template: `
     *     Bank Name: {{bankName}}
     *     Account Id: {{id}}
     *     Account Status: {{status ? 'Active' : 'InActive'}}
     *   `
     * })
     * class BankAccount {
     *   // This property is bound using its original name.
     *   // Defining argument required as true inside the Input Decorator
     *   // makes this property deceleration as mandatory
     *   @Input({ required: true }) bankName!: string;
     *   // Argument alias makes this property value is bound to a different property name
     *   // when this component is instantiated in a template.
     *   // Argument transform convert the input value from string to number
     *   @Input({ alias:'account-id', transform: numberAttribute }) id: number;
     *   // Argument transform the input value from string to boolean
     *   @Input({ transform: booleanAttribute }) status: boolean;
     *   // this property is not bound, and is not automatically updated by Angular
     *   normalizedBankName: string;
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `
     *     <bank-account bankName="RBC" account-id="4747" status="true"></bank-account>
     *   `
     * })
     * class App {}
     * ```
     *
     * @see [Input properties](guide/components/inputs)
     * @see [Output properties](guide/components/outputs)
     */
    (arg?: string | Input): any;
    new (arg?: string | Input): any;
}


/** Flags describing an input for a directive. */
declare enum InputFlags {
    None = 0,
    SignalBased = 1,
    HasDecoratorInputTransform = 2
}

/**
 * The `input` function allows declaration of inputs in directives and
 * components.
 *
 * The function exposes an API for also declaring required inputs via the
 * `input.required` function.
 *
 * @publicAPI
 * @docsPrivate Ignored because `input` is the canonical API entry.
 */
export declare interface InputFunction {
    /**
     * Initializes an input of type `T` with an initial value of `undefined`.
     * Angular will implicitly use `undefined` as initial value.
     */
    <T>(): InputSignal<T | undefined>;
    /** Declares an input of type `T` with an explicit initial value. */
    <T>(initialValue: T, opts?: InputOptionsWithoutTransform<T>): InputSignal<T>;
    /** Declares an input of type `T|undefined` without an initial value, but with input options */
    <T>(initialValue: undefined, opts: InputOptionsWithoutTransform<T>): InputSignal<T | undefined>;
    /**
     * Declares an input of type `T` with an initial value and a transform
     * function.
     *
     * The input accepts values of type `TransformT` and the given
     * transform function will transform the value to type `T`.
     */
    <T, TransformT>(initialValue: T, opts: InputOptionsWithTransform<T, TransformT>): InputSignalWithTransform<T, TransformT>;
    /**
     * Declares an input of type `T|undefined` without an initial value and with a transform
     * function.
     *
     * The input accepts values of type `TransformT` and the given
     * transform function will transform the value to type `T|undefined`.
     */ <T, TransformT>(initialValue: undefined, opts: InputOptionsWithTransform<T | undefined, TransformT>): InputSignalWithTransform<T | undefined, TransformT>;
    /**
     * Initializes a required input.
     *
     * Consumers of your directive/component need to bind to this
     * input. If unset, a compile time error will be reported.
     *
     * @publicAPI
     */
    required: {
        /** Declares a required input of type `T`. */
        <T>(opts?: InputOptionsWithoutTransform<T>): InputSignal<T>;
        /**
         * Declares a required input of type `T` with a transform function.
         *
         * The input accepts values of type `TransformT` and the given
         * transform function will transform the value to type `T`.
         */
        <T, TransformT>(opts: InputOptionsWithTransform<T, TransformT>): InputSignalWithTransform<T, TransformT>;
    };
}

/**
 * @publicAPI
 *
 * Options for signal inputs.
 */
export declare interface InputOptions<T, TransformT> {
    /** Optional public name for the input. By default, the class field name is used. */
    alias?: string;
    /**
     * Optional transform that runs whenever a new value is bound. Can be used to
     * transform the input value before the input is updated.
     *
     * The transform function can widen the type of the input. For example, consider
     * an input for `disabled`. In practice, as the component author, you want to only
     * deal with a boolean, but users may want to bind a string if they just use the
     * attribute form to bind to the input via `<my-dir input>`. A transform can then
     * handle such string values and convert them to `boolean`. See: {@link booleanAttribute}.
     */
    transform?: (v: TransformT) => T;
    /**
     * A debug name for the input signal. Used in Angular DevTools to identify the signal.
     */
    debugName?: string;
}

/**
 * Signal input options without the transform option.
 *
 * @publicAPI
 */
export declare type InputOptionsWithoutTransform<T> = Omit<InputOptions<T, T>, 'transform'> & {
    transform?: undefined;
};

/**
 * Signal input options with the transform option required.
 *
 * @publicAPI
 */
export declare type InputOptionsWithTransform<T, TransformT> = Required<Pick<InputOptions<T, TransformT>, 'transform'>> & InputOptions<T, TransformT>;

/**
 * `InputSignal` represents a special `Signal` for a directive/component input.
 *
 * An input signal is similar to a non-writable signal except that it also
 * carries additional type-information for transforms, and that Angular internally
 * updates the signal whenever a new value is bound.
 *
 * @see {@link InputOptionsWithTransform} for inputs with transforms.
 *
 * @publicAPI
 */
export declare interface InputSignal<T> extends InputSignalWithTransform<T, T> {
}

/**
 * `InputSignalWithTransform` represents a special `Signal` for a
 * directive/component input with a `transform` function.
 *
 * Signal inputs with transforms capture an extra generic for their transform write
 * type. Transforms can expand the accepted bound values for an input while ensuring
 * value retrievals of the signal input are still matching the generic input type.
 *
 * ```ts
 * class MyDir {
 *   disabled = input(false, {
 *     transform: (v: string|boolean) => convertToBoolean(v),
 *   }); // InputSignalWithTransform<boolean, string|boolean>
 *
 *   click() {
 *     this.disabled() // always returns a `boolean`.
 *   }
 * }
 * ```
 *
 * @see {@link InputSignal} for additional information.
 *
 * @publicAPI
 */
export declare interface InputSignalWithTransform<T, TransformT> extends Signal<T> {
    [ɵSIGNAL]: ɵInputSignalNode<T, TransformT>;
    [ɵINPUT_SIGNAL_BRAND_READ_TYPE]: T;
    [ɵINPUT_SIGNAL_BRAND_WRITE_TYPE]: TransformT;
}

/** Function that can be used to transform incoming input values. */
declare type InputTransformFunction = (value: any) => any;

/**
 * See `TNode.insertBeforeIndex`
 */
declare type InsertBeforeIndex = null | number | number[];

/**
 * This enum is an exact copy of the `InjectFlags` enum above, but the difference is that this is a
 * const enum, so actual enum values would be inlined in generated code. The `InjectFlags` enum can
 * be turned into a const enum when ViewEngine is removed (see TODO at the `InjectFlags` enum
 * above). The benefit of inlining is that we can use these flags at the top level without affecting
 * tree-shaking (see "no-toplevel-property-access" tslint rule for more info).
 * Keep this enum in sync with `InjectFlags` enum above.
 */
declare const enum InternalInjectFlags {
    /** Check self and check parent injector if needed */
    Default = 0,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 1,
    /** Don't ascend to ancestors of the node requesting injection. */
    Self = 2,
    /** Skip the node that is requesting injection. */
    SkipSelf = 4,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 8,
    /**
     * This token is being injected into a pipe.
     *
     * This flag is intentionally not in the public facing `InjectFlags` because it is only added by
     * the compiler and is not a developer applicable flag.
     */
    ForPipe = 16
}

declare interface InternalNgModuleRef<T> extends NgModuleRef<T> {
    _bootstrapComponents: Type<any>[];
    resolveInjectorInitializers(): void;
}


/**
 * Returns whether Angular is in development mode.
 *
 * By default, this is true, unless `enableProdMode` is invoked prior to calling this method or the
 * application is built using the Angular CLI with the `optimization` option.
 * @see {@link cli/build ng build}
 *
 * @publicApi
 */
export declare function isDevMode(): boolean;

/**
 * Checks if the given `value` is a reactive `Signal`.
 */
export declare function isSignal(value: unknown): value is Signal<unknown>;

/**
 * Checks whether a given Component, Directive or Pipe is marked as standalone.
 * This will return false if passed anything other than a Component, Directive, or Pipe class
 * See [this guide](guide/components/importing) for additional information:
 *
 * @param type A reference to a Component, Directive or Pipe.
 * @publicApi
 */
export declare function isStandalone(type: Type<unknown>): boolean;

/**
 * Record representing the item change information.
 *
 * @publicApi
 */
export declare interface IterableChangeRecord<V> {
    /** Current index of the item in `Iterable` or null if removed. */
    readonly currentIndex: number | null;
    /** Previous index of the item in `Iterable` or null if added. */
    readonly previousIndex: number | null;
    /** The item. */
    readonly item: V;
    /** Track by identity as computed by the `TrackByFunction`. */
    readonly trackById: any;
}

declare class IterableChangeRecord_<V> implements IterableChangeRecord<V> {
    item: V;
    trackById: any;
    currentIndex: number | null;
    previousIndex: number | null;
    constructor(item: V, trackById: any);
}

/**
 * An object describing the changes in the `Iterable` collection since last time
 * `IterableDiffer#diff()` was invoked.
 *
 * @publicApi
 */
export declare interface IterableChanges<V> {
    /**
     * Iterate over all changes. `IterableChangeRecord` will contain information about changes
     * to each item.
     */
    forEachItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /**
     * Iterate over a set of operations which when applied to the original `Iterable` will produce the
     * new `Iterable`.
     *
     * NOTE: These are not necessarily the actual operations which were applied to the original
     * `Iterable`, rather these are a set of computed operations which may not be the same as the
     * ones applied.
     *
     * @param record A change which needs to be applied
     * @param previousIndex The `IterableChangeRecord#previousIndex` of the `record` refers to the
     *        original `Iterable` location, where as `previousIndex` refers to the transient location
     *        of the item, after applying the operations up to this point.
     * @param currentIndex The `IterableChangeRecord#currentIndex` of the `record` refers to the
     *        original `Iterable` location, where as `currentIndex` refers to the transient location
     *        of the item, after applying the operations up to this point.
     */
    forEachOperation(fn: (record: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void): void;
    /**
     * Iterate over changes in the order of original `Iterable` showing where the original items
     * have moved.
     */
    forEachPreviousItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all added items. */
    forEachAddedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all moved items. */
    forEachMovedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all removed items. */
    forEachRemovedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /**
     * Iterate over all items which had their identity (as computed by the `TrackByFunction`)
     * changed.
     */
    forEachIdentityChange(fn: (record: IterableChangeRecord<V>) => void): void;
}

/**
 * A strategy for tracking changes over time to an iterable. Used by {@link NgForOf} to
 * respond to changes in an iterable by effecting equivalent changes in the DOM.
 *
 * @publicApi
 */
export declare interface IterableDiffer<V> {
    /**
     * Compute a difference between the previous state and the new `object` state.
     *
     * @param object containing the new value.
     * @returns an object describing the difference. The return value is only valid until the next
     * `diff()` invocation.
     */
    diff(object: NgIterable<V> | undefined | null): IterableChanges<V> | null;
}

/**
 * Provides a factory for {@link IterableDiffer}.
 *
 * @publicApi
 */
export declare interface IterableDifferFactory {
    supports(objects: any): boolean;
    create<V>(trackByFn?: TrackByFunction<V>): IterableDiffer<V>;
}

/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 *
 * @publicApi
 */
export declare class IterableDiffers {
    private factories;
    /** @nocollapse */
    static ɵprov: unknown;
    constructor(factories: IterableDifferFactory[]);
    static create(factories: IterableDifferFactory[], parent?: IterableDiffers): IterableDiffers;
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ```ts
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories: IterableDifferFactory[]): StaticProvider;
    find(iterable: any): IterableDifferFactory;
}

/**
 * The existence of this constant (in this particular file) informs the Angular compiler that the
 * current program is actually @angular/core, which needs to be compiled specially.
 */
declare const ITS_JUST_ANGULAR = true;

/**
 * `KeyValueArray` is an array where even positions contain keys and odd positions contain values.
 *
 * `KeyValueArray` provides a very efficient way of iterating over its contents. For small
 * sets (~10) the cost of binary searching an `KeyValueArray` has about the same performance
 * characteristics that of a `Map` with significantly better memory footprint.
 *
 * If used as a `Map` the keys are stored in alphabetical order so that they can be binary searched
 * for retrieval.
 *
 * See: `keyValueArraySet`, `keyValueArrayGet`, `keyValueArrayIndexOf`, `keyValueArrayDelete`.
 */
declare interface KeyValueArray<VALUE> extends Array<VALUE | string> {
    __brand__: 'array-map';
}

/**
 * Record representing the item change information.
 *
 * @publicApi
 */
export declare interface KeyValueChangeRecord<K, V> {
    /**
     * Current key in the Map.
     */
    readonly key: K;
    /**
     * Current value for the key or `null` if removed.
     */
    readonly currentValue: V | null;
    /**
     * Previous value for the key or `null` if added.
     */
    readonly previousValue: V | null;
}

/**
 * An object describing the changes in the `Map` or `{[k:string]: string}` since last time
 * `KeyValueDiffer#diff()` was invoked.
 *
 * @publicApi
 */
export declare interface KeyValueChanges<K, V> {
    /**
     * Iterate over all changes. `KeyValueChangeRecord` will contain information about changes
     * to each item.
     */
    forEachItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
    /**
     * Iterate over changes in the order of original Map showing where the original items
     * have moved.
     */
    forEachPreviousItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
    /**
     * Iterate over all keys for which values have changed.
     */
    forEachChangedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
    /**
     * Iterate over all added items.
     */
    forEachAddedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
    /**
     * Iterate over all removed items.
     */
    forEachRemovedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
}

/**
 * A differ that tracks changes made to an object over time.
 *
 * @publicApi
 */
export declare interface KeyValueDiffer<K, V> {
    /**
     * Compute a difference between the previous state and the new `object` state.
     *
     * @param object containing the new value.
     * @returns an object describing the difference. The return value is only valid until the next
     * `diff()` invocation.
     */
    diff(object: Map<K, V>): KeyValueChanges<K, V> | null;
    /**
     * Compute a difference between the previous state and the new `object` state.
     *
     * @param object containing the new value.
     * @returns an object describing the difference. The return value is only valid until the next
     * `diff()` invocation.
     */
    diff(object: {
        [key: string]: V;
    }): KeyValueChanges<string, V> | null;
}

/**
 * Provides a factory for {@link KeyValueDiffer}.
 *
 * @publicApi
 */
export declare interface KeyValueDifferFactory {
    /**
     * Test to see if the differ knows how to diff this kind of object.
     */
    supports(objects: any): boolean;
    /**
     * Create a `KeyValueDiffer`.
     */
    create<K, V>(): KeyValueDiffer<K, V>;
}

/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 *
 * @publicApi
 */
export declare class KeyValueDiffers {
    /** @nocollapse */
    static ɵprov: unknown;
    private readonly factories;
    constructor(factories: KeyValueDifferFactory[]);
    static create<S>(factories: KeyValueDifferFactory[], parent?: KeyValueDiffers): KeyValueDiffers;
    /**
     * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
     * {@link KeyValueDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link KeyValueDiffer} available.
     *
     * ```ts
     * @Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     */
    static extend<S>(factories: KeyValueDifferFactory[]): StaticProvider;
    find(kv: any): KeyValueDifferFactory;
}

/**
 * The state associated with a container.
 *
 * This is an array so that its structure is closer to LView. This helps
 * when traversing the view tree (which is a mix of containers and component
 * views), so we can jump to viewOrContainer[NEXT] in the same way regardless
 * of type.
 */
declare interface LContainer extends Array<any> {
    /**
     * The host element of this LContainer.
     *
     * The host could be an LView if this container is on a component node.
     * In that case, the component LView is its HOST.
     */
    readonly [HOST]: RElement | RComment | LView;
    /**
     * This is a type field which allows us to differentiate `LContainer` from `StylingContext` in an
     * efficient way. The value is always set to `true`
     */
    [TYPE]: true;
    /** Flags for this container. See LContainerFlags for more info. */
    [FLAGS]: LContainerFlags;
    /**
     * Access to the parent view is necessary so we can propagate back
     * up from inside a container to parent[NEXT].
     */
    [PARENT]: LView;
    /**
     * This allows us to jump from a container to a sibling container or component
     * view with the same parent, so we can remove listeners efficiently.
     */
    [NEXT]: LView | LContainer | null;
    /**
     * A collection of views created based on the underlying `<ng-template>` element but inserted into
     * a different `LContainer`. We need to track views created from a given declaration point since
     * queries collect matches from the embedded view declaration point and _not_ the insertion point.
     */
    [MOVED_VIEWS]: LView[] | null;
    /**
     * Pointer to the `TNode` which represents the host of the container.
     */
    [T_HOST]: TNode;
    /** The comment element that serves as an anchor for this LContainer. */
    [NATIVE]: RComment;
    /**
     * Array of `ViewRef`s used by any `ViewContainerRef`s that point to this container.
     *
     * This is lazily initialized by `ViewContainerRef` when the first view is inserted.
     *
     * NOTE: This is stored as `any[]` because render3 should really not be aware of `ViewRef` and
     * doing so creates circular dependency.
     */
    [VIEW_REFS]: unknown[] | null;
    /**
     * Array of dehydrated views within this container.
     *
     * This information is used during the hydration process on the client.
     * The hydration logic tries to find a matching dehydrated view, "claim" it
     * and use this information to do further matching. After that, this "claimed"
     * view is removed from the list. The remaining "unclaimed" views are
     * "garbage-collected" later on, i.e. removed from the DOM once the hydration
     * logic finishes.
     */
    [DEHYDRATED_VIEWS]: DehydratedContainerView[] | null;
}

/** Flags associated with an LContainer (saved in LContainer[FLAGS]) */
declare const enum LContainerFlags {
    None = 0,
    /**
     * Flag to signify that this `LContainer` may have transplanted views which need to be change
     * detected. (see: `LView[DECLARATION_COMPONENT_VIEW])`.
     *
     * This flag, once set, is never unset for the `LContainer`.
     */
    HasTransplantedViews = 2
}

declare type LegacyInputPartialMapping = string | [bindingPropertyName: string, classPropertyName: string, transformFunction?: Function];

/**
 * Creates a writable signal whose value is initialized and reset by the linked, reactive computation.
 *
 * @developerPreview
 */
export declare function linkedSignal<D>(computation: () => D, options?: {
    equal?: ValueEqualityFn<NoInfer<D>>;
}): WritableSignal<D>;

/**
 * Creates a writable signal whose value is initialized and reset by the linked, reactive computation.
 * This is an advanced API form where the computation has access to the previous value of the signal and the computation result.
 *
 * Note: The computation is reactive, meaning the linked signal will automatically update whenever any of the signals used within the computation change.
 *
 * @developerPreview
 */
export declare function linkedSignal<S, D>(options: {
    source: () => S;
    computation: (source: NoInfer<S>, previous?: {
        source: NoInfer<S>;
        value: NoInfer<D>;
    }) => D;
    equal?: ValueEqualityFn<NoInfer<D>>;
}): WritableSignal<D>;

/**
 * Event listener configuration returned from `getListeners`.
 * @publicApi
 */
declare interface Listener {
    /** Name of the event listener. */
    name: string;
    /** Element that the listener is bound to. */
    element: Element;
    /** Callback that is invoked when the event is triggered. */
    callback: (value: any) => any;
    /** Whether the listener is using event capturing. */
    useCapture: boolean;
    /**
     * Type of the listener (e.g. a native DOM event or a custom @Output).
     */
    type: 'dom' | 'output';
}

/**
 * Options that can be used to configure an event listener.
 * @publicApi
 */
export declare interface ListenerOptions {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
}

/**
 * Provide this token to set the locale of your application.
 * It is used for i18n extraction, by i18n pipes (DatePipe, I18nPluralPipe, CurrencyPipe,
 * DecimalPipe and PercentPipe) and by ICU expressions.
 *
 * See the [i18n guide](guide/i18n/locale-id) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```ts
 * import { LOCALE_ID } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: LOCALE_ID, useValue: 'en-US' }]
 * });
 * ```
 *
 * @publicApi
 */
export declare const LOCALE_ID: InjectionToken<string>;

/**
 * Type for a function that extracts a value for a local refs.
 * Example:
 * - `<div #nativeDivEl>` - `nativeDivEl` should point to the native `<div>` element;
 * - `<ng-template #tplRef>` - `tplRef` should point to the `TemplateRef` instance;
 */
declare type LocalRefExtractor = (tNode: TNodeWithLocalRefs, currentView: LView) => any;

/**
 * lQueries represent a collection of individual LQuery objects tracked in a given view.
 */
declare interface LQueries {
    /**
     * A collection of queries tracked in a given view.
     */
    queries: LQuery<any>[];
    /**
     * A method called when a new embedded view is created. As a result a set of LQueries applicable
     * for a new embedded view is instantiated (cloned) from the declaration view.
     * @param tView
     */
    createEmbeddedView(tView: TView): LQueries | null;
    /**
     * A method called when an embedded view is inserted into a container. As a result all impacted
     * `LQuery` objects (and associated `QueryList`) are marked as dirty.
     * @param tView
     */
    insertView(tView: TView): void;
    /**
     * A method called when an embedded view is detached from a container. As a result all impacted
     * `LQuery` objects (and associated `QueryList`) are marked as dirty.
     * @param tView
     */
    detachView(tView: TView): void;
    /**
     * A method called when a view finishes its creation pass. As a result all impacted
     * `LQuery` objects (and associated `QueryList`) are marked as dirty. This additional dirty
     * marking gives us a precise point in time where we can collect results for a given view in an
     * atomic way.
     * @param tView
     */
    finishViewCreation(tView: TView): void;
}

/**
 * An interface that represents query-related information specific to a view instance. Most notably
 * it contains:
 * - materialized query matches;
 * - a pointer to a QueryList where materialized query results should be reported.
 */
declare interface LQuery<T> {
    /**
     * Materialized query matches for a given view only (!). Results are initialized lazily so the
     * array of matches is set to `null` initially.
     */
    matches: (T | null)[] | null;
    /**
     * A QueryList where materialized query results should be reported.
     */
    queryList: QueryList<T>;
    /**
     * Clones an LQuery for an embedded view. A cloned query shares the same `QueryList` but has a
     * separate collection of materialized matches.
     */
    clone(): LQuery<T>;
    /**
     * Called when an embedded view, impacting results of this query, is inserted or removed.
     */
    setDirty(): void;
}

/**
 * `LView` stores all of the information needed to process the instructions as
 * they are invoked from the template. Each embedded view and component view has its
 * own `LView`. When processing a particular view, we set the `viewData` to that
 * `LView`. When that view is done processing, the `viewData` is set back to
 * whatever the original `viewData` was before (the parent `LView`).
 *
 * Keeping separate state for each view facilities view insertion / deletion, so we
 * don't have to edit the data array based on which views are present.
 */
declare interface LView<T = unknown> extends Array<any> {
    /**
     * The node into which this `LView` is inserted.
     */
    [HOST]: RElement | null;
    /**
     * The static data for this view. We need a reference to this so we can easily walk up the
     * node tree in DI and get the TView.data array associated with a node (where the
     * directive defs are stored).
     */
    readonly [TVIEW]: TView;
    /** Flags for this view. See LViewFlags for more info. */
    [FLAGS]: LViewFlags;
    /**
     * This may store an {@link LView} or {@link LContainer}.
     *
     * `LView` - The parent view. This is needed when we exit the view and must restore the previous
     * LView. Without this, the render method would have to keep a stack of
     * views as it is recursively rendering templates.
     *
     * `LContainer` - The current view is part of a container, and is an embedded view.
     */
    [PARENT]: LView | LContainer | null;
    /**
     *
     * The next sibling LView or LContainer.
     *
     * Allows us to propagate between sibling view states that aren't in the same
     * container. Embedded views already have a node.next, but it is only set for
     * views in the same container. We need a way to link component views and views
     * across containers as well.
     */
    [NEXT]: LView | LContainer | null;
    /** Queries active for this view - nodes from a view are reported to those queries. */
    [QUERIES]: LQueries | null;
    /**
     * Store the `TNode` of the location where the current `LView` is inserted into.
     *
     * Given:
     * ```html
     * <div>
     *   <ng-template><span></span></ng-template>
     * </div>
     * ```
     *
     * We end up with two `TView`s.
     * - `parent` `TView` which contains `<div><!-- anchor --></div>`
     * - `child` `TView` which contains `<span></span>`
     *
     * Typically the `child` is inserted into the declaration location of the `parent`, but it can be
     * inserted anywhere. Because it can be inserted anywhere it is not possible to store the
     * insertion information in the `TView` and instead we must store it in the `LView[T_HOST]`.
     *
     * So to determine where is our insertion parent we would execute:
     * ```ts
     * const parentLView = lView[PARENT];
     * const parentTNode = lView[T_HOST];
     * const insertionParent = parentLView[parentTNode.index];
     * ```
     *
     *
     * If `null`, this is the root view of an application (root component is in this view) and it has
     * no parents.
     */
    [T_HOST]: TNode | null;
    /**
     * When a view is destroyed, listeners need to be released and outputs need to be
     * unsubscribed. This context array stores both listener functions wrapped with
     * their context and output subscription instances for a particular view.
     *
     * These change per LView instance, so they cannot be stored on TView. Instead,
     * TView.cleanup saves an index to the necessary context in this array.
     *
     * After `LView` is created it is possible to attach additional instance specific functions at the
     * end of the `lView[CLEANUP]` because we know that no more `T` level cleanup functions will be
     * added here.
     */
    [CLEANUP]: any[] | null;
    /**
     * - For dynamic views, this is the context with which to render the template (e.g.
     *   `NgForContext`), or `{}` if not defined explicitly.
     * - For root view of the root component it's a reference to the component instance itself.
     * - For components, the context is a reference to the component instance itself.
     * - For inline views, the context is null.
     */
    [CONTEXT]: T;
    /** A Module Injector to be used as fall back after Element Injectors are consulted. */
    readonly [INJECTOR_2]: Injector;
    /**
     * Contextual data that is shared across multiple instances of `LView` in the same application.
     */
    [ENVIRONMENT]: LViewEnvironment;
    /** Renderer to be used for this view. */
    [RENDERER]: Renderer;
    /**
     * Reference to the first LView or LContainer beneath this LView in
     * the hierarchy.
     *
     * Necessary to store this so views can traverse through their nested views
     * to remove listeners and call onDestroy callbacks.
     */
    [CHILD_HEAD]: LView | LContainer | null;
    /**
     * The last LView or LContainer beneath this LView in the hierarchy.
     *
     * The tail allows us to quickly add a new state to the end of the view list
     * without having to propagate starting from the first child.
     */
    [CHILD_TAIL]: LView | LContainer | null;
    /**
     * View where this view's template was declared.
     *
     * The template for a dynamically created view may be declared in a different view than
     * it is inserted. We already track the "insertion view" (view where the template was
     * inserted) in LView[PARENT], but we also need access to the "declaration view"
     * (view where the template was declared). Otherwise, we wouldn't be able to call the
     * view's template function with the proper contexts. Context should be inherited from
     * the declaration view tree, not the insertion view tree.
     *
     * Example (AppComponent template):
     *
     * <ng-template #foo></ng-template>       <-- declared here -->
     * <some-comp [tpl]="foo"></some-comp>    <-- inserted inside this component -->
     *
     * The <ng-template> above is declared in the AppComponent template, but it will be passed into
     * SomeComp and inserted there. In this case, the declaration view would be the AppComponent,
     * but the insertion view would be SomeComp. When we are removing views, we would want to
     * traverse through the insertion view to clean up listeners. When we are calling the
     * template function during change detection, we need the declaration view to get inherited
     * context.
     */
    [DECLARATION_VIEW]: LView | null;
    /**
     * Points to the declaration component view, used to track transplanted `LView`s.
     *
     * See: `DECLARATION_VIEW` which points to the actual `LView` where it was declared, whereas
     * `DECLARATION_COMPONENT_VIEW` points to the component which may not be same as
     * `DECLARATION_VIEW`.
     *
     * Example:
     * ```html
     * <#VIEW #myComp>
     *  <div *ngIf="true">
     *   <ng-template #myTmpl>...</ng-template>
     *  </div>
     * </#VIEW>
     * ```
     * In the above case `DECLARATION_VIEW` for `myTmpl` points to the `LView` of `ngIf` whereas
     * `DECLARATION_COMPONENT_VIEW` points to `LView` of the `myComp` which owns the template.
     *
     * The reason for this is that all embedded views are always check-always whereas the component
     * view can be check-always or on-push. When we have a transplanted view it is important to
     * determine if we have transplanted a view from check-always declaration to on-push insertion
     * point. In such a case the transplanted view needs to be added to the `LContainer` in the
     * declared `LView` and CD during the declared view CD (in addition to the CD at the insertion
     * point.) (Any transplanted views which are intra Component are of no interest because the CD
     * strategy of declaration and insertion will always be the same, because it is the same
     * component.)
     *
     * Queries already track moved views in `LView[DECLARATION_LCONTAINER]` and
     * `LContainer[MOVED_VIEWS]`. However the queries also track `LView`s which moved within the same
     * component `LView`. Transplanted views are a subset of moved views, and we use
     * `DECLARATION_COMPONENT_VIEW` to differentiate them. As in this example.
     *
     * Example showing intra component `LView` movement.
     * ```html
     * <#VIEW #myComp>
     *   <div *ngIf="condition; then thenBlock else elseBlock"></div>
     *   <ng-template #thenBlock>Content to render when condition is true.</ng-template>
     *   <ng-template #elseBlock>Content to render when condition is false.</ng-template>
     * </#VIEW>
     * ```
     * The `thenBlock` and `elseBlock` is moved but not transplanted.
     *
     * Example showing inter component `LView` movement (transplanted view).
     * ```html
     * <#VIEW #myComp>
     *   <ng-template #myTmpl>...</ng-template>
     *   <insertion-component [template]="myTmpl"></insertion-component>
     * </#VIEW>
     * ```
     * In the above example `myTmpl` is passed into a different component. If `insertion-component`
     * instantiates `myTmpl` and `insertion-component` is on-push then the `LContainer` needs to be
     * marked as containing transplanted views and those views need to be CD as part of the
     * declaration CD.
     *
     *
     * When change detection runs, it iterates over `[MOVED_VIEWS]` and CDs any child `LView`s where
     * the `DECLARATION_COMPONENT_VIEW` of the current component and the child `LView` does not match
     * (it has been transplanted across components.)
     *
     * Note: `[DECLARATION_COMPONENT_VIEW]` points to itself if the LView is a component view (the
     *       simplest / most common case).
     *
     * see also:
     *   - https://hackmd.io/@mhevery/rJUJsvv9H write up of the problem
     *   - `LContainer[HAS_TRANSPLANTED_VIEWS]` which marks which `LContainer` has transplanted views.
     *   - `LContainer[TRANSPLANT_HEAD]` and `LContainer[TRANSPLANT_TAIL]` storage for transplanted
     *   - `LView[DECLARATION_LCONTAINER]` similar problem for queries
     *   - `LContainer[MOVED_VIEWS]` similar problem for queries
     */
    [DECLARATION_COMPONENT_VIEW]: LView;
    /**
     * A declaration point of embedded views (ones instantiated based on the content of a
     * <ng-template>), null for other types of views.
     *
     * We need to track all embedded views created from a given declaration point so we can prepare
     * query matches in a proper order (query matches are ordered based on their declaration point and
     * _not_ the insertion point).
     */
    [DECLARATION_LCONTAINER]: LContainer | null;
    /**
     * More flags for this view. See PreOrderHookFlags for more info.
     */
    [PREORDER_HOOK_FLAGS]: PreOrderHookFlags;
    /** Unique ID of the view. Used for `__ngContext__` lookups in the `LView` registry. */
    [ID]: number;
    /**
     * A container related to hydration annotation information that's associated with this LView.
     */
    [HYDRATION]: DehydratedView | null;
    /**
     * Optional injector assigned to embedded views that takes
     * precedence over the element and module injectors.
     */
    readonly [EMBEDDED_VIEW_INJECTOR]: Injector | null;
    /**
     * Effect scheduling operations that need to run during this views's update pass.
     */
    [EFFECTS_TO_SCHEDULE]: Array<() => void> | null;
    [EFFECTS]: Set<ViewEffectNode> | null;
    /**
     * A collection of callbacks functions that are executed when a given LView is destroyed. Those
     * are user defined, LView-specific destroy callbacks that don't have any corresponding TView
     * entries.
     */
    [ON_DESTROY_HOOKS]: Array<() => void> | null;
    /**
     * The `Consumer` for this `LView`'s template so that signal reads can be tracked.
     *
     * This is initially `null` and gets assigned a consumer after template execution
     * if any signals were read.
     */
    [REACTIVE_TEMPLATE_CONSUMER]: ReactiveLViewConsumer | null;
}

/**
 * Contextual data that is shared across multiple instances of `LView` in the same application.
 */
declare interface LViewEnvironment {
    /** Factory to be used for creating Renderer. */
    rendererFactory: RendererFactory;
    /** An optional custom sanitizer. */
    sanitizer: Sanitizer | null;
    /** Scheduler for change detection to notify when application state changes. */
    changeDetectionScheduler: ɵChangeDetectionScheduler | null;
}

/** Flags associated with an LView (saved in LView[FLAGS]) */
declare const enum LViewFlags {
    /** The state of the init phase on the first 2 bits */
    InitPhaseStateIncrementer = 1,
    InitPhaseStateMask = 3,
    /**
     * Whether or not the view is in creationMode.
     *
     * This must be stored in the view rather than using `data` as a marker so that
     * we can properly support embedded views. Otherwise, when exiting a child view
     * back into the parent view, `data` will be defined and `creationMode` will be
     * improperly reported as false.
     */
    CreationMode = 4,
    /**
     * Whether or not this LView instance is on its first processing pass.
     *
     * An LView instance is considered to be on its "first pass" until it
     * has completed one creation mode run and one update mode run. At this
     * time, the flag is turned off.
     */
    FirstLViewPass = 8,
    /** Whether this view has default change detection strategy (checks always) or onPush */
    CheckAlways = 16,
    /** Whether there are any i18n blocks inside this LView. */
    HasI18n = 32,
    /** Whether or not this view is currently dirty (needing check) */
    Dirty = 64,
    /** Whether or not this view is currently attached to change detection tree. */
    Attached = 128,
    /** Whether or not this view is destroyed. */
    Destroyed = 256,
    /** Whether or not this view is the root view */
    IsRoot = 512,
    /**
     * Whether this moved LView needs to be refreshed. Similar to the Dirty flag, but used for
     * transplanted and signal views where the parent/ancestor views are not marked dirty as well.
     * i.e. "Refresh just this view". Used in conjunction with the HAS_CHILD_VIEWS_TO_REFRESH
     * flag.
     */
    RefreshView = 1024,
    /** Indicates that the view **or any of its ancestors** have an embedded view injector. */
    HasEmbeddedViewInjector = 2048,
    /** Indicates that the view was created with `signals: true`. */
    SignalView = 4096,
    /**
     * Indicates that this LView has a view underneath it that needs to be refreshed during change
     * detection. This flag indicates that even if this view is not dirty itself, we still need to
     * traverse its children during change detection.
     */
    HasChildViewsToRefresh = 8192,
    /**
     * This is the count of the bits the 1 was shifted above (base 10)
     */
    IndexWithinInitPhaseShift = 14,
    /**
     * Index of the current init phase on last 21 bits
     */
    IndexWithinInitPhaseIncrementer = 16384,
    IndexWithinInitPhaseReset = 16383
}

/**
 * Wrap an array of `Provider`s into `EnvironmentProviders`, preventing them from being accidentally
 * referenced in `@Component` in a component injector.
 */
export declare function makeEnvironmentProviders(providers: (Provider | EnvironmentProviders)[]): EnvironmentProviders;

/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```ts
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
export declare function makeStateKey<T = void>(key: string): StateKey<T>;

/**
 * Merge multiple application configurations from left to right.
 *
 * @param configs Two or more configurations to be merged.
 * @returns A merged [ApplicationConfig](api/core/ApplicationConfig).
 *
 * @publicApi
 */
export declare function mergeApplicationConfig(...configs: ApplicationConfig[]): ApplicationConfig;

/**
 * Use this enum at bootstrap as an option of `bootstrapModule` to define the strategy
 * that the compiler should use in case of missing translations:
 * - Error: throw if you have missing translations.
 * - Warning (default): show a warning in the console and/or shell.
 * - Ignore: do nothing.
 *
 * See the [i18n guide](guide/i18n/merge#report-missing-translations) for more information.
 *
 * @usageNotes
 * ### Example
 * ```ts
 * import { MissingTranslationStrategy } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   missingTranslation: MissingTranslationStrategy.Error
 * });
 * ```
 *
 * @publicApi
 */
export declare enum MissingTranslationStrategy {
    Error = 0,
    Warning = 1,
    Ignore = 2
}

/**
 * `model` declares a writeable signal that is exposed as an input/output
 * pair on the containing directive.
 *
 * The input name is taken either from the class member or from the `alias` option.
 * The output name is generated by taking the input name and appending `Change`.
 *
 * @usageNotes
 *
 * To use `model()`, import the function from `@angular/core`.
 *
 * ```ts
 * import {model} from '@angular/core`;
 * ```
 *
 * Inside your component, introduce a new class member and initialize
 * it with a call to `model` or `model.required`.
 *
 * ```ts
 * @Directive({
 *   ...
 * })
 * export class MyDir {
 *   firstName = model<string>();            // ModelSignal<string|undefined>
 *   lastName  = model.required<string>();   // ModelSignal<string>
 *   age       = model(0);                   // ModelSignal<number>
 * }
 * ```
 *
 * Inside your component template, you can display the value of a `model`
 * by calling the signal.
 *
 * ```html
 * <span>{{firstName()}}</span>
 * ```
 *
 * Updating the `model` is equivalent to updating a writable signal.
 *
 * ```ts
 * updateName(newFirstName: string): void {
 *   this.firstName.set(newFirstName);
 * }
 * ```
 *
 * @publicAPI
 * @initializerApiFunction
 */
export declare const model: ModelFunction;

/**
 * `model` declares a writeable signal that is exposed as an input/output pair on the containing
 * directive. The input name is taken either from the class member or from the `alias` option.
 * The output name is generated by taking the input name and appending `Change`.
 *
 * The function exposes an API for also declaring required models via the
 * `model.required` function.
 *
 * @publicAPI
 * @docsPrivate Ignored because `model` is the canonical API entry.
 */
export declare interface ModelFunction {
    /**
     * Initializes a model of type `T` with an initial value of `undefined`.
     * Angular will implicitly use `undefined` as initial value.
     */
    <T>(): ModelSignal<T | undefined>;
    /** Initializes a model of type `T` with the given initial value. */
    <T>(initialValue: T, opts?: ModelOptions): ModelSignal<T>;
    required: {
        /**
         * Initializes a required model.
         *
         * Users of your directive/component need to bind to the input side of the model.
         * If unset, a compile time error will be reported.
         */
        <T>(opts?: ModelOptions): ModelSignal<T>;
    };
}

/**
 * @publicAPI
 *
 * Options for model signals.
 */
export declare interface ModelOptions {
    /**
     * Optional public name of the input side of the model. The output side will have the same
     * name as the input, but suffixed with `Change`. By default, the class field name is used.
     */
    alias?: string;
    /**
     * A debug name for the model signal. Used in Angular DevTools to identify the signal.
     */
    debugName?: string;
}

/**
 * `ModelSignal` represents a special `Signal` for a directive/component model field.
 *
 * A model signal is a writeable signal that can be exposed as an output.
 * Whenever its value is updated, it emits to the output.
 *
 * @publicAPI
 */
export declare interface ModelSignal<T> extends WritableSignal<T>, InputSignal<T>, OutputRef<T> {
    [ɵSIGNAL]: ɵInputSignalNode<T, T>;
}

/**
 * Combination of NgModuleFactory and ComponentFactories.
 *
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 */
export declare class ModuleWithComponentFactories<T> {
    ngModuleFactory: NgModuleFactory<T>;
    componentFactories: ComponentFactory<any>[];
    constructor(ngModuleFactory: NgModuleFactory<T>, componentFactories: ComponentFactory<any>[]);
}

/**
 * A wrapper around an NgModule that associates it with providers
 * Usage without a generic type is deprecated.
 *
 * @publicApi
 */
export declare interface ModuleWithProviders<T> {
    ngModule: Type<T>;
    providers?: Array<Provider | EnvironmentProviders>;
}

declare const MOVED_VIEWS = 9;

declare const MULTIPLIER = "x";

declare const NATIVE = 7;

declare const NEXT = 4;

declare interface NgGlobalPublishUtils {
    ɵgetLoadedRoutes(route: any): any;
}

/**
 * A type describing supported iterable types.
 *
 * @publicApi
 */
export declare type NgIterable<T> = Array<T> | Iterable<T>;

/**
 * Type of the NgModule metadata.
 *
 * @publicApi
 */
export declare interface NgModule {
    /**
     * The set of injectable objects that are available in the injector
     * of this module.
     *
     * @see [Dependency Injection guide](guide/di/dependency-injection
     * @see [NgModule guide](guide/ngmodules/providers)
     *
     * @usageNotes
     *
     * Dependencies whose providers are listed here become available for injection
     * into any component, directive, pipe or service that is a child of this injector.
     * The NgModule used for bootstrapping uses the root injector, and can provide dependencies
     * to any part of the app.
     *
     * A lazy-loaded module has its own injector, typically a child of the app root injector.
     * Lazy-loaded services are scoped to the lazy-loaded module's injector.
     * If a lazy-loaded module also provides the `UserService`, any component created
     * within that module's context (such as by router navigation) gets the local instance
     * of the service, not the instance in the root injector.
     * Components in external modules continue to receive the instance provided by their injectors.
     *
     * ### Example
     *
     * The following example defines a class that is injected in
     * the HelloWorld NgModule:
     *
     * ```ts
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @NgModule({
     *   providers: [
     *     Greeter
     *   ]
     * })
     * class HelloWorld {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     * ```
     */
    providers?: Array<Provider | EnvironmentProviders>;
    /**
     * The set of components, directives, and pipes (declarables
     * that belong to this module.
     *
     * @usageNotes
     *
     * The set of selectors that are available to a template include those declared here, and
     * those that are exported from imported NgModules.
     *
     * Declarables must belong to exactly one module.
     * The compiler emits an error if you try to declare the same class in more than one module.
     * Be careful not to declare a class that is imported from another module.
     *
     * ### Example
     *
     * The following example allows the CommonModule to use the `NgFor`
     * directive.
     *
     * ```javascript
     * @NgModule({
     *   declarations: [NgFor]
     * })
     * class CommonModule {
     * }
     * ```
     */
    declarations?: Array<Type<any> | any[]>;
    /**
     * The set of NgModules whose exported declarables
     * are available to templates in this module.
     *
     * @usageNotes
     *
     * A template can use exported declarables from any
     * imported module, including those from modules that are imported indirectly
     * and re-exported.
     * For example, `ModuleA` imports `ModuleB`, and also exports
     * it, which makes the declarables from `ModuleB` available
     * wherever `ModuleA` is imported.
     *
     * ### Example
     *
     * The following example allows MainModule to use anything exported by
     * `CommonModule`:
     *
     * ```javascript
     * @NgModule({
     *   imports: [CommonModule]
     * })
     * class MainModule {
     * }
     * ```
     *
     */
    imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
    /**
     * The set of components, directives, and pipes declared in this
     * NgModule that can be used in the template of any component that is part of an
     * NgModule that imports this NgModule. Exported declarations are the module's public API.
     *
     * A declarable belongs to one and only one NgModule.
     * A module can list another module among its exports, in which case all of that module's
     * public declaration are exported.
     *
     * @usageNotes
     *
     * Declarations are private by default.
     * If this ModuleA does not export UserComponent, then only the components within this
     * ModuleA can use UserComponent.
     *
     * ModuleA can import ModuleB and also export it, making exports from ModuleB
     * available to an NgModule that imports ModuleA.
     *
     * ### Example
     *
     * The following example exports the `NgFor` directive from CommonModule.
     *
     * ```javascript
     * @NgModule({
     *   exports: [NgFor]
     * })
     * class CommonModule {
     * }
     * ```
     */
    exports?: Array<Type<any> | any[]>;
    /**
     * The set of components that are bootstrapped when this module is bootstrapped.
     */
    bootstrap?: Array<Type<any> | any[]>;
    /**
     * The set of schemas that declare elements to be allowed in the NgModule.
     * Elements and properties that are neither Angular components nor directives
     * must be declared in a schema.
     *
     * Allowed value are `NO_ERRORS_SCHEMA` and `CUSTOM_ELEMENTS_SCHEMA`.
     *
     * @security When using one of `NO_ERRORS_SCHEMA` or `CUSTOM_ELEMENTS_SCHEMA`
     * you must ensure that allowed elements and properties securely escape inputs.
     */
    schemas?: Array<SchemaMetadata | any[]>;
    /**
     * A name or path that uniquely identifies this NgModule in `getNgModuleById`.
     * If left `undefined`, the NgModule is not registered with `getNgModuleById`.
     */
    id?: string;
    /**
     * When present, this module is ignored by the AOT compiler.
     * It remains in distributed code, and the JIT compiler attempts to compile it
     * at run time, in the browser.
     * To ensure the correct behavior, the app must import `@angular/compiler`.
     */
    jit?: true;
}

/**
 * @Annotation
 */
export declare const NgModule: NgModuleDecorator;

/**
 * Type of the NgModule decorator / constructor function.
 *
 * @publicApi
 */
export declare interface NgModuleDecorator {
    /**
     * Decorator that marks a class as an NgModule and supplies configuration metadata.
     */
    (obj?: NgModule): TypeDecorator;
    new (obj?: NgModule): NgModule;
}

/**
 * @publicApi
 *
 * @deprecated
 * This class was mostly used as a part of ViewEngine-based JIT API and is no longer needed in Ivy
 * JIT mode. Angular provides APIs that accept NgModule classes directly (such as
 * [PlatformRef.bootstrapModule](api/core/PlatformRef#bootstrapModule) and
 * [createNgModule](api/core/createNgModule)), consider switching to those APIs instead of
 * using factory-based ones.
 */
export declare abstract class NgModuleFactory<T> {
    abstract get moduleType(): Type<T>;
    abstract create(parentInjector: Injector | null): NgModuleRef<T>;
}

/**
 * Represents an instance of an `NgModule` created by an `NgModuleFactory`.
 * Provides access to the `NgModule` instance and related objects.
 *
 * @publicApi
 */
export declare abstract class NgModuleRef<T> {
    /**
     * The injector that contains all of the providers of the `NgModule`.
     */
    abstract get injector(): EnvironmentInjector;
    /**
     * The resolver that can retrieve component factories in a context of this module.
     *
     * Note: since v13, dynamic component creation via
     * [`ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)
     * does **not** require resolving component factory: component class can be used directly.
     *
     * @deprecated Angular no longer requires Component factories. Please use other APIs where
     *     Component class can be used directly.
     */
    abstract get componentFactoryResolver(): ComponentFactoryResolver;
    /**
     * The `NgModule` instance.
     */
    abstract get instance(): T;
    /**
     * Destroys the module instance and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Registers a callback to be executed when the module is destroyed.
     */
    abstract onDestroy(callback: () => void): void;
}

/** Represents scope data for NgModule as calculated during runtime by the deps tracker. */
declare interface NgModuleScope {
    compilation: ScopeData;
    exported: ScopeData;
}

/**
 * NgModule scope info as provided by AoT compiler
 *
 * In full compilation Ivy resolved all the "module with providers" and forward refs the whole array
 * if at least one element is forward refed. So we end up with type `Type<any>[]|(() =>
 * Type<any>[])`.
 *
 * In local mode the compiler passes the raw info as they are to the runtime functions as it is not
 * possible to resolve them any further due to limited info at compile time. So we end up with type
 * `RawScopeInfoFromDecorator[]`.
 */
declare interface NgModuleScopeInfoFromDecorator {
    /** List of components, directives, and pipes declared by this module. */
    declarations?: Type<any>[] | (() => Type<any>[]) | RawScopeInfoFromDecorator[];
    /** List of modules or `ModuleWithProviders` or standalone components imported by this module. */
    imports?: Type<any>[] | (() => Type<any>[]) | RawScopeInfoFromDecorator[];
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     */
    exports?: Type<any>[] | (() => Type<any>[]) | RawScopeInfoFromDecorator[];
    /**
     * The set of components that are bootstrapped when this module is bootstrapped. This field is
     * only available in local compilation mode. In full compilation mode bootstrap info is passed
     * directly to the module def runtime after statically analyzed and resolved.
     */
    bootstrap?: Type<any>[] | (() => Type<any>[]) | RawScopeInfoFromDecorator[];
}

/**
 * A token for third-party components that can register themselves with NgProbe.
 *
 * @deprecated
 * @publicApi
 */
export declare class NgProbeToken {
    name: string;
    token: any;
    constructor(name: string, token: any);
}

/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * @usageNotes
 * ### Example
 *
 * ```ts
 * import {Component, NgZone} from '@angular/core';
 * import {NgIf} from '@angular/common';
 *
 * @Component({
 *   selector: 'ng-zone-demo',
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *         // reenter the Angular zone and display done
 *         this._ngZone.run(() => { console.log('Outside Done!'); });
 *       });
 *     });
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback), 10);
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export declare class NgZone {
    readonly hasPendingMacrotasks: boolean;
    readonly hasPendingMicrotasks: boolean;
    /**
     * Whether there are no outstanding microtasks or macrotasks.
     */
    readonly isStable: boolean;
    /**
     * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
     */
    readonly onUnstable: EventEmitter<any>;
    /**
     * Notifies when there is no more microtasks enqueued in the current VM Turn.
     * This is a hint for Angular to do change detection, which may enqueue more microtasks.
     * For this reason this event can fire multiple times per VM Turn.
     */
    readonly onMicrotaskEmpty: EventEmitter<any>;
    /**
     * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
     * implies we are about to relinquish VM turn.
     * This event gets called just once.
     */
    readonly onStable: EventEmitter<any>;
    /**
     * Notifies that an error has been delivered.
     */
    readonly onError: EventEmitter<any>;
    constructor(options: {
        enableLongStackTrace?: boolean;
        shouldCoalesceEventChangeDetection?: boolean;
        shouldCoalesceRunChangeDetection?: boolean;
    });
    /**
     This method checks whether the method call happens within an Angular Zone instance.
     */
    static isInAngularZone(): boolean;
    /**
     Assures that the method is called within the Angular Zone, otherwise throws an error.
     */
    static assertInAngularZone(): void;
    /**
     Assures that the method is called outside of the Angular Zone, otherwise throws an error.
     */
    static assertNotInAngularZone(): void;
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T;
    /**
     * Executes the `fn` function synchronously within the Angular zone as a task and returns value
     * returned by the function.
     *
     * Running functions via `runTask` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[], name?: string): T;
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     */
    runGuarded<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T;
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
     * work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    runOutsideAngular<T>(fn: (...args: any[]) => T): T;
}

/**
 * Used to configure event and run coalescing with `provideZoneChangeDetection`.
 *
 * @publicApi
 *
 * @see {@link provideZoneChangeDetection}
 */
export declare interface NgZoneOptions {
    /**
     * Optionally specify coalescing event change detections or not.
     * Consider the following case.
     *
     * ```html
     * <div (click)="doSomething()">
     *   <button (click)="doSomethingElse()"></button>
     * </div>
     * ```
     *
     * When button is clicked, because of the event bubbling, both
     * event handlers will be called and 2 change detections will be
     * triggered. We can coalesce such kind of events to trigger
     * change detection only once.
     *
     * By default, this option is set to false, meaning events will
     * not be coalesced, and change detection will be triggered multiple times.
     * If this option is set to true, change detection will be triggered
     * once in the scenario described above.
     */
    eventCoalescing?: boolean;
    /**
     * Optionally specify if `NgZone#run()` method invocations should be coalesced
     * into a single change detection.
     *
     * Consider the following case.
     * ```ts
     * for (let i = 0; i < 10; i ++) {
     *   ngZone.run(() => {
     *     // do something
     *   });
     * }
     * ```
     *
     * This case triggers the change detection multiple times.
     * With ngZoneRunCoalescing options, all change detections in an event loop trigger only once.
     * In addition, the change detection executes in requestAnimation.
     *
     */
    runCoalescing?: boolean;
    /**
     * When false, change detection is scheduled when Angular receives
     * a clear indication that templates need to be refreshed. This includes:
     *
     * - calling `ChangeDetectorRef.markForCheck`
     * - calling `ComponentRef.setInput`
     * - updating a signal that is read in a template
     * - attaching a view that is marked dirty
     * - removing a view
     * - registering a render hook (templates are only refreshed if render hooks do one of the above)
     *
     * @deprecated This option was introduced out of caution as a way for developers to opt out of the
     *    new behavior in v18 which schedule change detection for the above events when they occur
     *    outside the Zone. After monitoring the results post-release, we have determined that this
     *    feature is working as desired and do not believe it should ever be disabled by setting
     *    this option to `true`.
     */
    ignoreChangesOutsideZone?: boolean;
}

/**
 * Defines a schema that allows any property on any element.
 *
 * This schema allows you to ignore the errors related to any unknown elements or properties in a
 * template. The usage of this schema is generally discouraged because it prevents useful validation
 * and may hide real errors in your template. Consider using the `CUSTOM_ELEMENTS_SCHEMA` instead.
 *
 * @publicApi
 */
export declare const NO_ERRORS_SCHEMA: SchemaMetadata;

/**
 * Store the runtime input for all directives applied to a node.
 *
 * This allows efficiently setting the same input on a directive that
 * might apply to multiple directives.
 *
 * i+0: directive instance index
 * i+1: privateName
 * i+2: input flags
 *
 * e.g.
 * ```
 * {
 *   "publicName": [0, 'change-minified', <bit-input-flags>]
 * }
 * ```
 */
declare type NodeInputBindings = Record<string, (number | string | InputFlags)[]>;

/**
 * Store the runtime output names for all the directives.
 *
 * i+0: directive instance index
 * i+1: privateName
 *
 * e.g.
 * ```
 * {
 *   "publicName": [0, 'change-minified']
 * }
 */
declare type NodeOutputBindings = Record<string, (number | string)[]>;

declare const NODES = "n";

declare const NUM_ROOT_NODES = "r";

/**
 * Transforms a value (typically a string) to a number.
 * Intended to be used as a transform function of an input.
 * @param value Value to be transformed.
 * @param fallbackValue Value to use if the provided value can't be parsed as a number.
 *
 *  @usageNotes
 *  ```ts
 *  @Input({ transform: numberAttribute }) id!: number;
 *  ```
 *
 * @publicApi
 */
export declare function numberAttribute(value: unknown, fallbackValue?: number): number;

declare const ON_DESTROY_HOOKS = 21;

/**
 * @description
 * A lifecycle hook that is called when any data-bound property of a directive changes.
 * Define an `ngOnChanges()` method to handle the changes.
 *
 * @see {@link DoCheck}
 * @see {@link OnInit}
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define an on-changes handler for an input property.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * @publicApi
 */
export declare interface OnChanges {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked data-bound properties
     * if at least one has changed, and before the view and content
     * children are checked.
     * @param changes The changed properties.
     */
    ngOnChanges(changes: SimpleChanges): void;
}

/**
 * A lifecycle hook that is called when a directive, pipe, or service is destroyed.
 * Use for any custom cleanup that needs to occur when the
 * instance is destroyed.
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface
 * to define its own custom clean-up method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * @publicApi
 */
export declare interface OnDestroy {
    /**
     * A callback method that performs custom clean-up, invoked immediately
     * before a directive, pipe, or service instance is destroyed.
     */
    ngOnDestroy(): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has initialized
 * all data-bound properties of a directive.
 * Define an `ngOnInit()` method to handle any additional initialization tasks.
 *
 * @see {@link AfterContentInit}
 * @see [Lifecycle hooks guide](guide/components/lifecycle)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 * @publicApi
 */
export declare interface OnInit {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    ngOnInit(): void;
}

declare type OpaqueValue = unknown;

declare interface OpaqueViewState {
    '__brand__': 'Brand for OpaqueViewState that nothing will match';
}

/**
 * Type of the Optional metadata.
 *
 * @publicApi
 */
export declare interface Optional {
}

/**
 * Optional decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Optional: OptionalDecorator;

/**
 * Type of the Optional decorator / constructor function.
 *
 * @publicApi
 */
export declare interface OptionalDecorator {
    /**
     * Parameter decorator to be used on constructor parameters,
     * which marks the parameter as being an optional dependency.
     * The DI framework provides `null` if the dependency is not found.
     *
     * Can be used together with other parameter decorators
     * that modify how dependency injection operates.
     *
     * @usageNotes
     *
     * The following code allows the possibility of a `null` result:
     *
     * {@example core/di/ts/metadata_spec.ts region='Optional'}
     *
     * @see [Dependency Injection Guide](guide/di/dependency-injection.
     */
    (): any;
    new (): Optional;
}

/**
 * Type of the Output metadata.
 *
 * @publicApi
 */
export declare interface Output {
    /**
     * The name of the DOM property to which the output property is bound.
     */
    alias?: string;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const Output: OutputDecorator;

/**
 * The `output` function allows declaration of Angular outputs in
 * directives and components.
 *
 * You can use outputs to emit values to parent directives and component.
 * Parents can subscribe to changes via:
 *
 * - template event bindings. For example, `(myOutput)="doSomething($event)"`
 * - programmatic subscription by using `OutputRef#subscribe`.
 *
 * @usageNotes
 *
 * To use `output()`, import the function from `@angular/core`.
 *
 * ```ts
 * import {output} from '@angular/core';
 * ```
 *
 * Inside your component, introduce a new class member and initialize
 * it with a call to `output`.
 *
 * ```ts
 * @Directive({
 *   ...
 * })
 * export class MyDir {
 *   nameChange = output<string>();    // OutputEmitterRef<string>
 *   onClick    = output();            // OutputEmitterRef<void>
 * }
 * ```
 *
 * You can emit values to consumers of your directive, by using
 * the `emit` method from `OutputEmitterRef`.
 *
 * ```ts
 * updateName(newName: string): void {
 *   this.nameChange.emit(newName);
 * }
 * ```
 * @initializerApiFunction {"showTypesInSignaturePreview": true}
 * @publicAPI
 */
export declare function output<T = void>(opts?: OutputOptions): OutputEmitterRef<T>;

/**
 * Type of the Output decorator / constructor function.
 *
 * @publicApi
 */
export declare interface OutputDecorator {
    /**
     * Decorator that marks a class field as an output property and supplies configuration metadata.
     * The DOM property bound to the output property is automatically updated during change detection.
     *
     * @usageNotes
     *
     * You can supply an optional name to use in templates when the
     * component is instantiated, that maps to the
     * name of the bound property. By default, the original
     * name of the bound property is used for output binding.
     *
     * See `Input` decorator for an example of providing a binding name.
     *
     * @see [Input properties](guide/components/inputs)
     * @see [Output properties](guide/components/outputs)
     *
     */
    (alias?: string): any;
    new (alias?: string): any;
}

/**
 * An `OutputEmitterRef` is created by the `output()` function and can be
 * used to emit values to consumers of your directive or component.
 *
 * Consumers of your directive/component can bind to the output and
 * subscribe to changes via the bound event syntax. For example:
 *
 * ```html
 * <my-comp (valueChange)="processNewValue($event)" />
 * ```
 *
 * @publicAPI
 */
export declare class OutputEmitterRef<T> implements OutputRef<T> {
    private destroyed;
    private listeners;
    private errorHandler;
    constructor();
    subscribe(callback: (value: T) => void): OutputRefSubscription;
    /** Emits a new value to the output. */
    emit(value: T): void;
}

/**
 * Options for declaring an output.
 *
 * @publicAPI
 */
export declare interface OutputOptions {
    alias?: string;
}

/**
 * A reference to an Angular output.
 *
 * @publicAPI
 */
export declare interface OutputRef<T> {
    /**
     * Registers a callback that is invoked whenever the output
     * emits a new value of type `T`.
     *
     * Angular will automatically clean up the subscription when
     * the directive/component of the output is destroyed.
     */
    subscribe(callback: (value: T) => void): OutputRefSubscription;
}


/**
 * Function that can be used to manually clean up a
 * programmatic {@link OutputRef#subscribe} subscription.
 *
 * Note: Angular will automatically clean up subscriptions
 * when the directive/component of the output is destroyed.
 *
 * @publicAPI
 */
export declare interface OutputRefSubscription {
    unsubscribe(): void;
}

/**
 * A DI token that indicates the root directory of
 * the application
 * @publicApi
 * @deprecated
 */
export declare const PACKAGE_ROOT_URL: InjectionToken<string>;

declare const PARENT = 3;

/**
 * Service that keeps track of pending tasks contributing to the stableness of Angular
 * application. While several existing Angular services (ex.: `HttpClient`) will internally manage
 * tasks influencing stability, this API gives control over stability to library and application
 * developers for specific cases not covered by Angular internals.
 *
 * The concept of stability comes into play in several important scenarios:
 * - SSR process needs to wait for the application stability before serializing and sending rendered
 * HTML;
 * - tests might want to delay assertions until the application becomes stable;
 *
 * @usageNotes
 * ```ts
 * const pendingTasks = inject(PendingTasks);
 * const taskCleanup = pendingTasks.add();
 * // do work that should block application's stability and then:
 * taskCleanup();
 * ```
 *
 * @publicApi
 * @developerPreview
 */
export declare class PendingTasks {
    private internalPendingTasks;
    private scheduler;
    /**
     * Adds a new task that should block application's stability.
     * @returns A cleanup function that removes a task when called.
     */
    add(): () => void;
    /**
     * Runs an asynchronous function and blocks the application's stability until the function completes.
     *
     * ```ts
     * pendingTasks.run(async () => {
     *   const userData = await fetch('/api/user');
     *   this.userData.set(userData);
     * });
     * ```
     *
     * Application stability is at least delayed until the next tick after the `run` method resolves
     * so it is safe to make additional updates to application state that would require UI synchronization:
     *
     * ```ts
     * const userData = await pendingTasks.run(() => fetch('/api/user'));
     * this.userData.set(userData);
     * ```
     *
     * @param fn The asynchronous function to execute
     */
    run<T>(fn: () => Promise<T>): Promise<T>;
    /** @nocollapse */
    static ɵprov: unknown;
}

/**
 * Type of the Pipe metadata.
 *
 * @publicApi
 */
export declare interface Pipe {
    /**
     * The pipe name to use in template bindings.
     * Typically uses lowerCamelCase
     * because the name cannot contain hyphens.
     */
    name: string;
    /**
     * When true, the pipe is pure, meaning that the
     * `transform()` method is invoked only when its input arguments
     * change. Pipes are pure by default.
     *
     * If the pipe has internal state (that is, the result
     * depends on state other than its arguments), set `pure` to false.
     * In this case, the pipe is invoked on each change-detection cycle,
     * even if the arguments have not changed.
     */
    pure?: boolean;
    /**
     * Angular pipes marked as `standalone` do not need to be declared in an NgModule. Such
     * pipes don't depend on any "intermediate context" of an NgModule (ex. configured providers).
     *
     * More information about standalone components, directives, and pipes can be found in [this
     * guide](guide/components/importing).
     */
    standalone?: boolean;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const Pipe: PipeDecorator;

/**
 * Type of the Pipe decorator / constructor function.
 *
 * @publicApi
 */
export declare interface PipeDecorator {
    /**
     *
     * Decorator that marks a class as pipe and supplies configuration metadata.
     *
     * A pipe class must implement the `PipeTransform` interface.
     * For example, if the name is "myPipe", use a template binding expression
     * such as the following:
     *
     * ```html
     * {{ exp | myPipe }}
     * ```
     *
     * The result of the expression is passed to the pipe's `transform()` method.
     *
     * A pipe must belong to an NgModule in order for it to be available
     * to a template. To make it a member of an NgModule,
     * list it in the `declarations` field of the `NgModule` metadata.
     *
     * @see [Style Guide: Pipe Names](style-guide#02-09)
     *
     */
    (obj: Pipe): TypeDecorator;
    /**
     * See the `Pipe` decorator.
     */
    new (obj: Pipe): Pipe;
}

declare type PipeDefList = ɵPipeDef<any>[];

/**
 * Type used for PipeDefs on component definition.
 *
 * The function is necessary to be able to support forward declarations.
 */
declare type PipeDefListOrFactory = (() => PipeDefList) | PipeDefList;


/**
 * An interface that is implemented by pipes in order to perform a transformation.
 * Angular invokes the `transform` method with the value of a binding
 * as the first argument, and any parameters as the second argument in list form.
 *
 * @usageNotes
 *
 * In the following example, `TruncatePipe` returns the shortened value with an added ellipses.
 *
 * <code-example path="core/ts/pipes/simple_truncate.ts" header="simple_truncate.ts"></code-example>
 *
 * Invoking `{{ 'It was the best of times' | truncate }}` in a template will produce `It was...`.
 *
 * In the following example, `TruncatePipe` takes parameters that sets the truncated length and the
 * string to append with.
 *
 * <code-example path="core/ts/pipes/truncate.ts" header="truncate.ts"></code-example>
 *
 * Invoking `{{ 'It was the best of times' | truncate:4:'....' }}` in a template will produce `It
 * was the best....`.
 *
 * @publicApi
 */
export declare interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}

/**
 * A subclass of `Type` which has a static `ɵpipe`:`PipeDef` field making it
 * consumable for rendering.
 */
declare interface PipeType<T> extends Type<T> {
    ɵpipe: unknown;
}

/**
 * A token that indicates an opaque platform ID.
 * @publicApi
 */
export declare const PLATFORM_ID: InjectionToken<Object>;

/**
 * A function that is executed when a platform is initialized.
 *
 * @deprecated from v19.0.0, use providePlatformInitializer instead
 *
 * @see {@link providePlatformInitializer}
 *
 * @publicApi
 */
export declare const PLATFORM_INITIALIZER: InjectionToken<readonly (() => void)[]>;

/**
 * This platform has to be included in any other platform
 *
 * @publicApi
 */
export declare const platformCore: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

/**
 * The Angular platform is the entry point for Angular on a web page.
 * Each page has exactly one platform. Services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 * A page's platform is initialized implicitly when a platform is created using a platform
 * factory such as `PlatformBrowser`, or explicitly by calling the `createPlatform()` function.
 *
 * @publicApi
 */
export declare class PlatformRef {
    private _injector;
    private _modules;
    private _destroyListeners;
    private _destroyed;
    /**
     * Creates an instance of an `@NgModule` for the given platform.
     *
     * @deprecated Passing NgModule factories as the `PlatformRef.bootstrapModuleFactory` function
     *     argument is deprecated. Use the `PlatformRef.bootstrapModule` API instead.
     */
    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions): Promise<NgModuleRef<M>>;
    /**
     * Creates an instance of an `@NgModule` for a given platform.
     *
     * @usageNotes
     * ### Simple Example
     *
     * ```ts
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * let moduleRef = platformBrowser().bootstrapModule(MyModule);
     * ```
     *
     */
    bootstrapModule<M>(moduleType: Type<M>, compilerOptions?: (CompilerOptions & BootstrapOptions) | Array<CompilerOptions & BootstrapOptions>): Promise<NgModuleRef<M>>;
    /**
     * Registers a listener to be called when the platform is destroyed.
     */
    onDestroy(callback: () => void): void;
    /**
     * Retrieves the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    get injector(): Injector;
    /**
     * Destroys the current Angular platform and all Angular applications on the page.
     * Destroys all modules and listeners registered with the platform.
     */
    destroy(): void;
    /**
     * Indicates whether this instance was destroyed.
     */
    get destroyed(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlatformRef, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlatformRef>;
}

declare interface PlatformReflectionCapabilities {
    factory(type: Type<any>): Function;
    hasLifecycleHook(type: any, lcProperty: string): boolean;
    /**
     * Return a list of annotations/types for constructor parameters
     */
    parameters(type: Type<any>): any[][];
    /**
     * Return a list of annotations declared on the class
     */
    annotations(type: Type<any>): any[];
    /**
     * Return a object literal which describes the annotations on Class fields/properties.
     */
    propMetadata(typeOrFunc: Type<any>): {
        [key: string]: any[];
    };
}

/**
 * A boolean-valued function over a value, possibly including context information
 * regarding that value's position in an array.
 *
 * @publicApi
 */
export declare type Predicate<T> = (value: T) => boolean;

declare const PREORDER_HOOK_FLAGS = 17;

/** More flags associated with an LView (saved in LView[PREORDER_HOOK_FLAGS]) */
declare const enum PreOrderHookFlags {
    /**
     The index of the next pre-order hook to be called in the hooks array, on the first 16
     bits
     */
    IndexOfTheNextPreOrderHookMaskMask = 65535,
    /**
     * The number of init hooks that have already been called, on the last 16 bits
     */
    NumberOfInitHooksCalledIncrementer = 65536,
    NumberOfInitHooksCalledShift = 16,
    NumberOfInitHooksCalledMask = 4294901760
}

/**
 * Describes a function that is used to process provider lists (such as provider
 * overrides).
 */
declare type ProcessProvidersFunction = (providers: Provider[]) => Provider[];

/**
 * List of slots for a projection. A slot can be either based on a parsed CSS selector
 * which will be used to determine nodes which are projected into that slot.
 *
 * When set to "*", the slot is reserved and can be used for multi-slot projection
 * using {@link ViewContainerRef#createComponent}. The last slot that specifies the
 * wildcard selector will retrieve all projectable nodes which do not match any selector.
 */
declare type ProjectionSlots = (ɵCssSelectorList | '*')[];

/**
 * Options to the `resource` function, for creating a resource.
 *
 * @experimental
 */
export declare interface PromiseResourceOptions<T, R> extends BaseResourceOptions<T, R> {
    /**
     * Loading function which returns a `Promise` of the resource's value for a given request.
     */
    loader: ResourceLoader<T, R>;
    /**
     * Cannot specify `stream` and `loader` at the same time.
     */
    stream?: never;
}

/**
 * @description
 * The provided function is injected at application startup and executed during
 * app initialization. If the function returns a Promise or an Observable, initialization
 * does not complete until the Promise is resolved or the Observable is completed.
 *
 * You can, for example, create a function that loads language data
 * or an external configuration, and provide that function using `provideAppInitializer()`.
 * The function is executed during the application bootstrap process,
 * and the needed data is available on startup.
 *
 * Note that the provided initializer is run in the injection context.
 *
 * Previously, this was achieved using the `APP_INITIALIZER` token which is now deprecated.
 *
 * @see {@link APP_INITIALIZER}
 *
 * @usageNotes
 * The following example illustrates how to configure an initialization function using
 * `provideAppInitializer()`
 * ```ts
 * bootstrapApplication(App, {
 *   providers: [
 *     provideAppInitializer(() => {
 *       const http = inject(HttpClient);
 *       return firstValueFrom(
 *         http
 *           .get("https://someUrl.com/api/user")
 *           .pipe(tap(user => { ... }))
 *       );
 *     }),
 *     provideHttpClient(),
 *   ],
 * });
 * ```
 *
 * @publicApi
 */
export declare function provideAppInitializer(initializerFn: () => Observable<unknown> | Promise<unknown> | void): EnvironmentProviders;

/**
 * @description
 * This function is used to provide initialization functions that will be executed upon construction
 * of an environment injector.
 *
 * Note that the provided initializer is run in the injection context.
 *
 * Previously, this was achieved using the `ENVIRONMENT_INITIALIZER` token which is now deprecated.
 *
 * @see {@link ENVIRONMENT_INITIALIZER}
 *
 * @usageNotes
 * The following example illustrates how to configure an initialization function using
 * `provideEnvironmentInitializer()`
 * ```ts
 * createEnvironmentInjector(
 *   [
 *     provideEnvironmentInitializer(() => {
 *       console.log('environment initialized');
 *     }),
 *   ],
 *   parentInjector
 * );
 * ```
 *
 * @publicApi
 */
export declare function provideEnvironmentInitializer(initializerFn: () => void): EnvironmentProviders;

/**
 * Used to periodically verify no expressions have changed after they were checked.
 *
 * @param options Used to configure when the check will execute.
 *   - `interval` will periodically run exhaustive `checkNoChanges` on application views
 *   - `useNgZoneOnStable` will use ZoneJS to determine when change detection might have run
 *      in an application using ZoneJS to drive change detection. When the `NgZone.onStable` would
 *      have emitted, all views attached to the `ApplicationRef` are checked for changes.
 *   - 'exhaustive' means that all views attached to `ApplicationRef` and all the descendants of those views will be
 *     checked for changes (excluding those subtrees which are detached via `ChangeDetectorRef.detach()`).
 *     This is useful because the check that runs after regular change detection does not work for components using `ChangeDetectionStrategy.OnPush`.
 *     This check is will surface any existing errors hidden by `OnPush` components. By default, this check is exhaustive
 *     and will always check all views, regardless of their "dirty" state and `ChangeDetectionStrategy`.
 *
 * When the `useNgZoneOnStable` option is `true`, this function will provide its own `NgZone` implementation and needs
 * to come after any other `NgZone` provider, including `provideZoneChangeDetection()` and `provideExperimentalZonelessChangeDetection()`.
 *
 * @experimental
 * @publicApi
 */
export declare function provideExperimentalCheckNoChangesForDebug(options: {
    interval?: number;
    useNgZoneOnStable?: boolean;
    exhaustive?: boolean;
}): EnvironmentProviders_2;

/**
 * Provides change detection without ZoneJS for the application bootstrapped using
 * `bootstrapApplication`.
 *
 * This function allows you to configure the application to not use the state/state changes of
 * ZoneJS to schedule change detection in the application. This will work when ZoneJS is not present
 * on the page at all or if it exists because something else is using it (either another Angular
 * application which uses ZoneJS for scheduling or some other library that relies on ZoneJS).
 *
 * This can also be added to the `TestBed` providers to configure the test environment to more
 * closely match production behavior. This will help give higher confidence that components are
 * compatible with zoneless change detection.
 *
 * ZoneJS uses browser events to trigger change detection. When using this provider, Angular will
 * instead use Angular APIs to schedule change detection. These APIs include:
 *
 * - `ChangeDetectorRef.markForCheck`
 * - `ComponentRef.setInput`
 * - updating a signal that is read in a template
 * - when bound host or template listeners are triggered
 * - attaching a view that was marked dirty by one of the above
 * - removing a view
 * - registering a render hook (templates are only refreshed if render hooks do one of the above)
 *
 * @usageNotes
 * ```ts
 * bootstrapApplication(MyApp, {providers: [
 *   provideExperimentalZonelessChangeDetection(),
 * ]});
 * ```
 *
 * This API is experimental. Neither the shape, nor the underlying behavior is stable and can change
 * in patch versions. There are known feature gaps and API ergonomic considerations. We will iterate
 * on the exact API based on the feedback and our understanding of the problem and solution space.
 *
 * @publicApi
 * @experimental
 * @see [bootstrapApplication](/api/platform-browser/bootstrapApplication)
 */
export declare function provideExperimentalZonelessChangeDetection(): EnvironmentProviders;

/**
 * @description
 * This function is used to provide initialization functions that will be executed upon
 * initialization of the platform injector.
 *
 * Note that the provided initializer is run in the injection context.
 *
 * Previously, this was achieved using the `PLATFORM_INITIALIZER` token which is now deprecated.
 *
 * @see {@link PLATFORM_INITIALIZER}
 *
 * @publicApi
 */
export declare function providePlatformInitializer(initializerFn: () => void): EnvironmentProviders;

/**
 * Describes how the `Injector` should be configured.
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @see {@link StaticProvider}
 *
 * @publicApi
 */
export declare type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider | any[];

/**
 * @description
 *
 * Token that can be used to retrieve an instance from an injector or through a query.
 *
 * @publicApi
 */
export declare type ProviderToken<T> = Type<T> | AbstractType<T> | InjectionToken<T>;

/**
 * Provides `NgZone`-based change detection for the application bootstrapped using
 * `bootstrapApplication`.
 *
 * `NgZone` is already provided in applications by default. This provider allows you to configure
 * options like `eventCoalescing` in the `NgZone`.
 * This provider is not available for `platformBrowser().bootstrapModule`, which uses
 * `BootstrapOptions` instead.
 *
 * @usageNotes
 * ```ts
 * bootstrapApplication(MyApp, {providers: [
 *   provideZoneChangeDetection({eventCoalescing: true}),
 * ]});
 * ```
 *
 * @publicApi
 * @see {@link bootstrapApplication}
 * @see {@link NgZoneOptions}
 */
export declare function provideZoneChangeDetection(options?: NgZoneOptions): EnvironmentProviders;

/**
 * Testability API.
 * `declare` keyword causes tsickle to generate externs, so these methods are
 * not renamed by Closure Compiler.
 * @publicApi
 */
declare interface PublicTestability {
    isStable(): boolean;
    whenStable(callback: Function, timeout?: number, updateCallback?: Function): void;
    findProviders(using: any, provider: string, exactMatch: boolean): any[];
}

declare const QUERIES = 18;

/**
 * Type of the Query metadata.
 *
 * @publicApi
 */
export declare interface Query {
    descendants: boolean;
    emitDistinctChangesOnly: boolean;
    first: boolean;
    read: any;
    isViewQuery: boolean;
    selector: any;
    static?: boolean;
}

/**
 * Base class for query metadata.
 *
 * @see {@link ContentChildren}
 * @see {@link ContentChild}
 * @see {@link ViewChildren}
 * @see {@link ViewChild}
 *
 * @publicApi
 */
export declare abstract class Query {
}

/**
 * A set of flags to be used with Queries.
 *
 * NOTE: Ensure changes here are reflected in `packages/compiler/src/render3/view/compiler.ts`
 */
declare const enum QueryFlags {
    /**
     * No flags
     */
    none = 0,
    /**
     * Whether or not the query should descend into children.
     */
    descendants = 1,
    /**
     * The query can be computed statically and hence can be assigned eagerly.
     *
     * NOTE: Backwards compatibility with ViewEngine.
     */
    isStatic = 2,
    /**
     * If the `QueryList` should fire change event only if actual change to query was computed (vs old
     * behavior where the change was fired whenever the query was recomputed, even if the recomputed
     * query resulted in the same list.)
     */
    emitDistinctChangesOnly = 4
}

/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {@link ViewChildren}, {@link ContentChildren}, and {@link QueryList}
 * provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * @usageNotes
 * ### Example
 * ```ts
 * @Component({...})
 * class Container {
 *   @ViewChildren(Item) items:QueryList<Item>;
 * }
 * ```
 *
 * @publicApi
 */
export declare class QueryList<T> implements Iterable<T> {
    private _emitDistinctChangesOnly;
    readonly dirty = true;
    private _onDirty?;
    private _results;
    private _changesDetected;
    private _changes;
    readonly length: number;
    readonly first: T;
    readonly last: T;
    /**
     * Returns `Observable` of `QueryList` notifying the subscriber of changes.
     */
    get changes(): Observable<any>;
    /**
     * @param emitDistinctChangesOnly Whether `QueryList.changes` should fire only when actual change
     *     has occurred. Or if it should fire when query is recomputed. (recomputing could resolve in
     *     the same result)
     */
    constructor(_emitDistinctChangesOnly?: boolean);
    /**
     * Returns the QueryList entry at `index`.
     */
    get(index: number): T | undefined;
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     */
    map<U>(fn: (item: T, index: number, array: T[]) => U): U[];
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     */
    filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S): S[];
    filter(predicate: (value: T, index: number, array: readonly T[]) => unknown): T[];
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     */
    find(fn: (item: T, index: number, array: T[]) => boolean): T | undefined;
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     */
    reduce<U>(fn: (prevValue: U, curValue: T, curIndex: number, array: T[]) => U, init: U): U;
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     */
    forEach(fn: (item: T, index: number, array: T[]) => void): void;
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     */
    some(fn: (value: T, index: number, array: T[]) => boolean): boolean;
    /**
     * Returns a copy of the internal results list as an Array.
     */
    toArray(): T[];
    toString(): string;
    /**
     * Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
     * on change detection, it will not notify of changes to the queries, unless a new change
     * occurs.
     *
     * @param resultsTree The query results to store
     * @param identityAccessor Optional function for extracting stable object identity from a value
     *    in the array. This function is executed for each element of the query result list while
     *    comparing current query list with the new one (provided as a first argument of the `reset`
     *    function) to detect if the lists are different. If the function is not provided, elements
     *    are compared as is (without any pre-processing).
     */
    reset(resultsTree: Array<T | any[]>, identityAccessor?: (value: T) => unknown): void;
    /**
     * Triggers a change event by emitting on the `changes` {@link EventEmitter}.
     */
    notifyOnChanges(): void;
    /** internal */
    setDirty(): void;
    /** internal */
    destroy(): void;
    [Symbol.iterator]: () => Iterator<T>;
}

declare interface R3DeclareComponentFacade extends R3DeclareDirectiveFacade {
    template: string;
    isInline?: boolean;
    styles?: string[];
    dependencies?: R3DeclareTemplateDependencyFacade[];
    components?: R3DeclareDirectiveDependencyFacade[];
    directives?: R3DeclareDirectiveDependencyFacade[];
    pipes?: {
        [pipeName: string]: OpaqueValue | (() => OpaqueValue);
    };
    deferBlockDependencies?: (() => Promise<Type_2> | null)[];
    viewProviders?: OpaqueValue;
    animations?: OpaqueValue;
    changeDetection?: ChangeDetectionStrategy_2;
    encapsulation?: ViewEncapsulation_2;
    interpolation?: [string, string];
    preserveWhitespaces?: boolean;
}

declare interface R3DeclareDependencyMetadataFacade {
    token: OpaqueValue;
    attribute?: boolean;
    host?: boolean;
    optional?: boolean;
    self?: boolean;
    skipSelf?: boolean;
}

declare interface R3DeclareDirectiveDependencyFacade {
    kind?: 'directive' | 'component';
    selector: string;
    type: OpaqueValue | (() => OpaqueValue);
    inputs?: string[];
    outputs?: string[];
    exportAs?: string[];
}

declare interface R3DeclareDirectiveFacade {
    selector?: string;
    type: Type_2;
    version: string;
    inputs?: {
        [fieldName: string]: {
            classPropertyName: string;
            publicName: string;
            isSignal: boolean;
            isRequired: boolean;
            transformFunction: Function | null;
        } | LegacyInputPartialMapping;
    };
    outputs?: {
        [classPropertyName: string]: string;
    };
    host?: {
        attributes?: {
            [key: string]: OpaqueValue;
        };
        listeners?: {
            [key: string]: string;
        };
        properties?: {
            [key: string]: string;
        };
        classAttribute?: string;
        styleAttribute?: string;
    };
    queries?: R3DeclareQueryMetadataFacade[];
    viewQueries?: R3DeclareQueryMetadataFacade[];
    providers?: OpaqueValue;
    exportAs?: string[];
    usesInheritance?: boolean;
    usesOnChanges?: boolean;
    isStandalone?: boolean;
    hostDirectives?: R3HostDirectiveMetadataFacade[] | null;
    isSignal?: boolean;
}

declare interface R3DeclareFactoryFacade {
    type: Type_2;
    deps: R3DeclareDependencyMetadataFacade[] | 'invalid' | null;
    target: ɵɵFactoryTarget;
}

declare interface R3DeclareInjectableFacade {
    type: Type_2;
    providedIn?: Type_2 | 'root' | 'platform' | 'any' | null;
    useClass?: OpaqueValue;
    useFactory?: OpaqueValue;
    useExisting?: OpaqueValue;
    useValue?: OpaqueValue;
    deps?: R3DeclareDependencyMetadataFacade[];
}

declare interface R3DeclareInjectorFacade {
    type: Type_2;
    imports?: OpaqueValue[];
    providers?: OpaqueValue[];
}

declare interface R3DeclareNgModuleDependencyFacade {
    kind: 'ngmodule';
    type: OpaqueValue | (() => OpaqueValue);
}

declare interface R3DeclareNgModuleFacade {
    type: Type_2;
    bootstrap?: OpaqueValue[] | (() => OpaqueValue[]);
    declarations?: OpaqueValue[] | (() => OpaqueValue[]);
    imports?: OpaqueValue[] | (() => OpaqueValue[]);
    exports?: OpaqueValue[] | (() => OpaqueValue[]);
    schemas?: OpaqueValue[];
    id?: OpaqueValue;
}

declare interface R3DeclarePipeDependencyFacade {
    kind?: 'pipe';
    name: string;
    type: OpaqueValue | (() => OpaqueValue);
}

declare interface R3DeclarePipeFacade {
    type: Type_2;
    name: string;
    version: string;
    pure?: boolean;
    isStandalone?: boolean;
}

declare interface R3DeclareQueryMetadataFacade {
    propertyName: string;
    first?: boolean;
    predicate: OpaqueValue | string[];
    descendants?: boolean;
    read?: OpaqueValue;
    static?: boolean;
    emitDistinctChangesOnly?: boolean;
    isSignal?: boolean;
}

declare type R3DeclareTemplateDependencyFacade = {
    kind: string;
} & (R3DeclareDirectiveDependencyFacade | R3DeclarePipeDependencyFacade | R3DeclareNgModuleDependencyFacade);

declare interface R3HostDirectiveMetadataFacade {
    directive: Type_2;
    inputs?: string[];
    outputs?: string[];
}

/**
 * The array element type passed to:
 *  - NgModule's annotation imports/exports/declarations fields
 *  - standalone component annotation imports field
 */
declare type RawScopeInfoFromDecorator = Type<any> | ModuleWithProviders<any> | (() => Type<any>) | (() => ModuleWithProviders<any>) | any[];

declare interface RComment extends RNode {
    textContent: string | null;
}

declare interface RCssStyleDeclaration {
    removeProperty(propertyName: string): string;
    setProperty(propertyName: string, value: string | null, priority?: string): void;
}

declare interface RDomTokenList {
    add(token: string): void;
    remove(token: string): void;
}

declare const REACTIVE_TEMPLATE_CONSUMER = 24;

declare interface ReactiveLViewConsumer extends ReactiveNode {
    lView: LView | null;
}

/**
 * Creates an object that allows to retrieve component metadata.
 *
 * @usageNotes
 *
 * The example below demonstrates how to use the function and how the fields
 * of the returned object map to the component metadata.
 *
 * ```angular-ts
 * @Component({
 *   standalone: true,
 *   selector: 'foo-component',
 *   template: `
 *     <ng-content></ng-content>
 *     <ng-content select="content-selector-a"></ng-content>
 *   `,
 * })
 * class FooComponent {
 *   @Input('inputName') inputPropName: string;
 *   @Output('outputName') outputPropName = new EventEmitter<void>();
 * }
 *
 * const mirror = reflectComponentType(FooComponent);
 * expect(mirror.type).toBe(FooComponent);
 * expect(mirror.selector).toBe('foo-component');
 * expect(mirror.isStandalone).toBe(true);
 * expect(mirror.inputs).toEqual([{propName: 'inputName', templateName: 'inputPropName'}]);
 * expect(mirror.outputs).toEqual([{propName: 'outputName', templateName: 'outputPropName'}]);
 * expect(mirror.ngContentSelectors).toEqual([
 *   '*',                 // first `<ng-content>` in a template, the selector defaults to `*`
 *   'content-selector-a' // second `<ng-content>` in a template
 * ]);
 * ```
 *
 * @param component Component class reference.
 * @returns An object that allows to retrieve component metadata.
 *
 * @publicApi
 */
export declare function reflectComponentType<C>(component: Type<C>): ComponentMirror<C> | null;

/**
 * Subset of API needed for writing attributes, properties, and setting up
 * listeners on Element.
 */
declare interface RElement extends RNode {
    firstChild: RNode | null;
    style: RCssStyleDeclaration;
    classList: RDomTokenList;
    className: string;
    tagName: string;
    textContent: string | null;
    hasAttribute(name: string): boolean;
    getAttribute(name: string): string | null;
    setAttribute(name: string, value: string | TrustedHTML | TrustedScript | TrustedScriptURL): void;
    removeAttribute(name: string): void;
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string | TrustedHTML | TrustedScript | TrustedScriptURL): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
    removeEventListener(type: string, listener?: EventListener, options?: boolean): void;
    remove(): void;
    setProperty?(name: string, value: any): void;
}

declare const RENDERER = 11;

/**
 * Procedural style of API needed to create elements and text nodes.
 *
 * In non-native browser environments (e.g. platforms such as web-workers), this is the
 * facade that enables element manipulation. In practice, this is implemented by `Renderer2`.
 */
declare interface Renderer {
    destroy(): void;
    createComment(value: string): RComment;
    createElement(name: string, namespace?: string | null): RElement;
    createText(value: string): RText;
    /**
     * This property is allowed to be null / undefined,
     * in which case the view engine won't call it.
     * This is used as a performance optimization for production mode.
     */
    destroyNode?: ((node: RNode) => void) | null;
    appendChild(parent: RElement, newChild: RNode): void;
    insertBefore(parent: RNode, newChild: RNode, refChild: RNode | null, isMove?: boolean): void;
    removeChild(parent: RElement | null, oldChild: RNode, isHostElement?: boolean): void;
    selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): RElement;
    parentNode(node: RNode): RElement | null;
    nextSibling(node: RNode): RNode | null;
    setAttribute(el: RElement, name: string, value: string | TrustedHTML | TrustedScript | TrustedScriptURL, namespace?: string | null): void;
    removeAttribute(el: RElement, name: string, namespace?: string | null): void;
    addClass(el: RElement, name: string): void;
    removeClass(el: RElement, name: string): void;
    setStyle(el: RElement, style: string, value: any, flags?: RendererStyleFlags2): void;
    removeStyle(el: RElement, style: string, flags?: RendererStyleFlags2): void;
    setProperty(el: RElement, name: string, value: any): void;
    setValue(node: RText | RComment, value: string): void;
    listen(target: GlobalTargetName | RNode, eventName: string, callback: (event: any) => boolean | void, options?: ListenerOptions): () => void;
}

/**
 * Extend this base class to implement custom rendering. By default, Angular
 * renders a template into DOM. You can use custom rendering to intercept
 * rendering calls, or to render to something other than DOM.
 *
 * Create your custom renderer using `RendererFactory2`.
 *
 * Use a custom renderer to bypass Angular's templating and
 * make custom UI changes that can't be expressed declaratively.
 * For example if you need to set a property or an attribute whose name is
 * not statically known, use the `setProperty()` or
 * `setAttribute()` method.
 *
 * @publicApi
 */
export declare abstract class Renderer2 {
    /**
     * Use to store arbitrary developer-defined data on a renderer instance,
     * as an object containing key-value pairs.
     * This is useful for renderers that delegate to other renderers.
     */
    abstract get data(): {
        [key: string]: any;
    };
    /**
     * Implement this callback to destroy the renderer or the host element.
     */
    abstract destroy(): void;
    /**
     * Implement this callback to create an instance of the host element.
     * @param name An identifying name for the new element, unique within the namespace.
     * @param namespace The namespace for the new element.
     * @returns The new element.
     */
    abstract createElement(name: string, namespace?: string | null): any;
    /**
     * Implement this callback to add a comment to the DOM of the host element.
     * @param value The comment text.
     * @returns The modified element.
     */
    abstract createComment(value: string): any;
    /**
     * Implement this callback to add text to the DOM of the host element.
     * @param value The text string.
     * @returns The modified element.
     */
    abstract createText(value: string): any;
    /**
     * If null or undefined, the view engine won't call it.
     * This is used as a performance optimization for production mode.
     */
    destroyNode: ((node: any) => void) | null;
    /**
     * Appends a child to a given parent node in the host element DOM.
     * @param parent The parent node.
     * @param newChild The new child node.
     */
    abstract appendChild(parent: any, newChild: any): void;
    /**
     * Implement this callback to insert a child node at a given position in a parent node
     * in the host element DOM.
     * @param parent The parent node.
     * @param newChild The new child nodes.
     * @param refChild The existing child node before which `newChild` is inserted.
     * @param isMove Optional argument which signifies if the current `insertBefore` is a result of a
     *     move. Animation uses this information to trigger move animations. In the past the Animation
     *     would always assume that any `insertBefore` is a move. This is not strictly true because
     *     with runtime i18n it is possible to invoke `insertBefore` as a result of i18n and it should
     *     not trigger an animation move.
     */
    abstract insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean): void;
    /**
     * Implement this callback to remove a child node from the host element's DOM.
     * @param parent The parent node.
     * @param oldChild The child node to remove.
     * @param isHostElement Optionally signal to the renderer whether this element is a host element
     * or not
     */
    abstract removeChild(parent: any, oldChild: any, isHostElement?: boolean): void;
    /**
     * Implement this callback to prepare an element to be bootstrapped
     * as a root element, and return the element instance.
     * @param selectorOrNode The DOM element.
     * @param preserveContent Whether the contents of the root element
     * should be preserved, or cleared upon bootstrap (default behavior).
     * Use with `ViewEncapsulation.ShadowDom` to allow simple native
     * content projection via `<slot>` elements.
     * @returns The root element.
     */
    abstract selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any;
    /**
     * Implement this callback to get the parent of a given node
     * in the host element's DOM.
     * @param node The child node to query.
     * @returns The parent node, or null if there is no parent.
     * This is because the check is synchronous,
     * and the caller can't rely on checking for null.
     */
    abstract parentNode(node: any): any;
    /**
     * Implement this callback to get the next sibling node of a given node
     * in the host element's DOM.
     * @returns The sibling node, or null if there is no sibling.
     * This is because the check is synchronous,
     * and the caller can't rely on checking for null.
     */
    abstract nextSibling(node: any): any;
    /**
     * Implement this callback to set an attribute value for an element in the DOM.
     * @param el The element.
     * @param name The attribute name.
     * @param value The new value.
     * @param namespace The namespace.
     */
    abstract setAttribute(el: any, name: string, value: string, namespace?: string | null): void;
    /**
     * Implement this callback to remove an attribute from an element in the DOM.
     * @param el The element.
     * @param name The attribute name.
     * @param namespace The namespace.
     */
    abstract removeAttribute(el: any, name: string, namespace?: string | null): void;
    /**
     * Implement this callback to add a class to an element in the DOM.
     * @param el The element.
     * @param name The class name.
     */
    abstract addClass(el: any, name: string): void;
    /**
     * Implement this callback to remove a class from an element in the DOM.
     * @param el The element.
     * @param name The class name.
     */
    abstract removeClass(el: any, name: string): void;
    /**
     * Implement this callback to set a CSS style for an element in the DOM.
     * @param el The element.
     * @param style The name of the style.
     * @param value The new value.
     * @param flags Flags for style variations. No flags are set by default.
     */
    abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void;
    /**
     * Implement this callback to remove the value from a CSS style for an element in the DOM.
     * @param el The element.
     * @param style The name of the style.
     * @param flags Flags for style variations to remove, if set. ???
     */
    abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void;
    /**
     * Implement this callback to set the value of a property of an element in the DOM.
     * @param el The element.
     * @param name The property name.
     * @param value The new value.
     */
    abstract setProperty(el: any, name: string, value: any): void;
    /**
     * Implement this callback to set the value of a node in the host element.
     * @param node The node.
     * @param value The new value.
     */
    abstract setValue(node: any, value: string): void;
    /**
     * Implement this callback to start an event listener.
     * @param target The context in which to listen for events. Can be
     * the entire window or document, the body of the document, or a specific
     * DOM element.
     * @param eventName The event to listen for.
     * @param callback A handler function to invoke when the event occurs.
     * @param options Options that configure how the event listener is bound.
     * @returns An "unlisten" function for disposing of this handler.
     */
    abstract listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void, options?: ListenerOptions): () => void;
}

declare interface RendererFactory {
    createRenderer(hostElement: RElement | null, rendererType: RendererType2 | null): Renderer;
    begin?(): void;
    end?(): void;
}

/**
 * Creates and initializes a custom renderer that implements the `Renderer2` base class.
 *
 * @publicApi
 */
export declare abstract class RendererFactory2 {
    /**
     * Creates and initializes a custom renderer for a host DOM element.
     * @param hostElement The element to render.
     * @param type The base class to implement.
     * @returns The new custom renderer instance.
     */
    abstract createRenderer(hostElement: any, type: RendererType2 | null): Renderer2;
    /**
     * A callback invoked when rendering has begun.
     */
    abstract begin?(): void;
    /**
     * A callback invoked when rendering has completed.
     */
    abstract end?(): void;
    /**
     * Use with animations test-only mode. Notifies the test when rendering has completed.
     * @returns The asynchronous result of the developer-defined function.
     */
    abstract whenRenderingDone?(): Promise<any>;
}

/**
 * Flags for renderer-specific style modifiers.
 * @publicApi
 */
export declare enum RendererStyleFlags2 {
    /**
     * Marks a style as important.
     */
    Important = 1,
    /**
     * Marks a style as using dash case naming (this-is-dash-case).
     */
    DashCase = 2
}

/**
 * Used by `RendererFactory2` to associate custom rendering data and styles
 * with a rendering implementation.
 *  @publicApi
 */
export declare interface RendererType2 {
    /**
     * A unique identifying string for the new renderer, used when creating
     * unique styles for encapsulation.
     */
    id: string;
    /**
     * The view encapsulation type, which determines how styles are applied to
     * DOM elements. One of
     * - `Emulated` (default): Emulate native scoping of styles.
     * - `Native`: Use the native encapsulation mechanism of the renderer.
     * - `ShadowDom`: Use modern [Shadow
     * DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * create a ShadowRoot for component's host element.
     * - `None`: Do not provide any template or style encapsulation.
     */
    encapsulation: ViewEncapsulation;
    /**
     * Defines CSS styles to be stored on a renderer instance.
     */
    styles: string[];
    /**
     * Defines arbitrary developer-defined data to be stored on a renderer instance.
     * This is useful for renderers that delegate to other renderers.
     */
    data: {
        [kind: string]: any;
    };
    /**
     * A function added by the {@link ɵɵExternalStylesFeature} and used by the framework to create
     * the list of external runtime style URLs.
     */
    getExternalStyles?: ((encapsulationId?: string) => string[]) | null;
}

/**
 * Injection token representing the current HTTP request object.
 *
 * Use this token to access the current request when handling server-side
 * rendering (SSR).
 *
 * @remarks
 * This token may be `null` in the following scenarios:
 *
 * * During the build processes.
 * * When the application is rendered in the browser (client-side rendering).
 * * When performing static site generation (SSG).
 * * During route extraction in development (at the time of the request).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request | `Request` on MDN}
 *
 * @developerPreview
 */
export declare const REQUEST: InjectionToken<Request | null>;

/**
 * Injection token for additional request context.
 *
 * Use this token to pass custom metadata or context related to the current request in server-side rendering.
 *
 * @remarks
 * This token is only available during server-side rendering and will be `null` in other contexts.
 *
 * @developerPreview
 */
export declare const REQUEST_CONTEXT: InjectionToken<unknown>;

/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * @see {@link forwardRef}
 * @publicApi
 */
export declare function resolveForwardRef<T>(type: T): T;

/**
 * A Resource is an asynchronous dependency (for example, the results of an API call) that is
 * managed and delivered through signals.
 *
 * The usual way of creating a `Resource` is through the `resource` function, but various other APIs
 * may present `Resource` instances to describe their own concepts.
 *
 * @experimental
 */
export declare interface Resource<T> {
    /**
     * The current value of the `Resource`, or `undefined` if there is no current value.
     */
    readonly value: Signal<T>;
    /**
     * The current status of the `Resource`, which describes what the resource is currently doing and
     * what can be expected of its `value`.
     */
    readonly status: Signal<ResourceStatus>;
    /**
     * When in the `error` state, this returns the last known error from the `Resource`.
     */
    readonly error: Signal<unknown>;
    /**
     * Whether this resource is loading a new value (or reloading the existing one).
     */
    readonly isLoading: Signal<boolean>;
    /**
     * Whether this resource has a valid current value.
     *
     * This function is reactive.
     */
    hasValue(): this is Resource<Exclude<T, undefined>>;
    /**
     * Instructs the resource to re-load any asynchronous dependency it may have.
     *
     * Note that the resource will not enter its reloading state until the actual backend request is
     * made.
     *
     * @returns true if a reload was initiated, false if a reload was unnecessary or unsupported
     */
    reload(): boolean;
}

/**
 * Constructs a `Resource` that projects a reactive request to an asynchronous operation defined by
 * a loader function, which exposes the result of the loading operation via signals.
 *
 * Note that `resource` is intended for _read_ operations, not operations which perform mutations.
 * `resource` will cancel in-progress loads via the `AbortSignal` when destroyed or when a new
 * request object becomes available, which could prematurely abort mutations.
 *
 * @experimental
 */
export declare function resource<T, R>(options: ResourceOptions<T, R> & {
    defaultValue: NoInfer<T>;
}): ResourceRef<T>;

/**
 * Constructs a `Resource` that projects a reactive request to an asynchronous operation defined by
 * a loader function, which exposes the result of the loading operation via signals.
 *
 * Note that `resource` is intended for _read_ operations, not operations which perform mutations.
 * `resource` will cancel in-progress loads via the `AbortSignal` when destroyed or when a new
 * request object becomes available, which could prematurely abort mutations.
 *
 * @experimental
 */
export declare function resource<T, R>(options: ResourceOptions<T, R>): ResourceRef<T | undefined>;

/**
 * Loading function for a `Resource`.
 *
 * @experimental
 */
export declare type ResourceLoader<T, R> = (param: ResourceLoaderParams<R>) => PromiseLike<T>;

/**
 * Parameter to a `ResourceLoader` which gives the request and other options for the current loading
 * operation.
 *
 * @experimental
 */
export declare interface ResourceLoaderParams<R> {
    request: Exclude<NoInfer<R>, undefined>;
    abortSignal: AbortSignal;
    previous: {
        status: ResourceStatus;
    };
}

/**
 * @experimental
 */
export declare type ResourceOptions<T, R> = PromiseResourceOptions<T, R> | StreamingResourceOptions<T, R>;

/**
 * A `WritableResource` created through the `resource` function.
 *
 * @experimental
 */
export declare interface ResourceRef<T> extends WritableResource<T> {
    hasValue(): this is ResourceRef<Exclude<T, undefined>>;
    /**
     * Manually destroy the resource, which cancels pending requests and returns it to `idle` state.
     */
    destroy(): void;
}

/**
 * Status of a `Resource`.
 *
 * @experimental
 */
export declare enum ResourceStatus {
    /**
     * The resource has no valid request and will not perform any loading.
     *
     * `value()` will be `undefined`.
     */
    Idle = 0,
    /**
     * Loading failed with an error.
     *
     * `value()` will be `undefined`.
     */
    Error = 1,
    /**
     * The resource is currently loading a new value as a result of a change in its `request`.
     *
     * `value()` will be `undefined`.
     */
    Loading = 2,
    /**
     * The resource is currently reloading a fresh value for the same request.
     *
     * `value()` will continue to return the previously fetched value during the reloading operation.
     */
    Reloading = 3,
    /**
     * Loading has completed and the resource has the value returned from the loader.
     */
    Resolved = 4,
    /**
     * The resource's value was set locally via `.set()` or `.update()`.
     */
    Local = 5
}

/**
 * Streaming loader for a `Resource`.
 *
 * @experimental
 */
export declare type ResourceStreamingLoader<T, R> = (param: ResourceLoaderParams<R>) => PromiseLike<Signal<ResourceStreamItem<T>>>;

/**
 * @experimental
 */
export declare type ResourceStreamItem<T> = {
    value: T;
} | {
    error: unknown;
};

/**
 * Injection token for response initialization options.
 *
 * Use this token to provide response options for configuring or initializing
 * HTTP responses in server-side rendering or API endpoints.
 *
 * @remarks
 * This token may be `null` in the following scenarios:
 *
 * * During the build processes.
 * * When the application is rendered in the browser (client-side rendering).
 * * When performing static site generation (SSG).
 * * During route extraction in development (at the time of the request).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response | `ResponseInit` on MDN}
 *
 * @developerPreview
 */
export declare const RESPONSE_INIT: InjectionToken<ResponseInit | null>;

/**
 * The goal here is to make sure that the browser DOM API is the Renderer.
 * We do this by defining a subset of DOM API to be the renderer and then
 * use that at runtime for rendering.
 *
 * At runtime we can then use the DOM api directly, in server or web-worker
 * it will be easy to implement such API.
 */
/** Subset of API needed for appending elements and text nodes. */
declare interface RNode {
    /**
     * Returns the parent Element, Document, or DocumentFragment
     */
    parentNode: RNode | null;
    /**
     * Returns the parent Element if there is one
     */
    parentElement: RElement | null;
    /**
     * Gets the Node immediately following this one in the parent's childNodes
     */
    nextSibling: RNode | null;
    /**
     * Insert a child node.
     *
     * Used exclusively for adding View root nodes into ViewAnchor location.
     */
    insertBefore(newChild: RNode, refChild: RNode | null, isViewRoot: boolean): void;
    /**
     * Append a child node.
     *
     * Used exclusively for building up DOM which are static (ie not View roots)
     */
    appendChild(newChild: RNode): RNode;
}

declare interface RText extends RNode {
    textContent: string | null;
}

/**
 * Runs the given function in the [context](guide/di/dependency-injection-context) of the given
 * `Injector`.
 *
 * Within the function's stack frame, [`inject`](api/core/inject) can be used to inject dependencies
 * from the given `Injector`. Note that `inject` is only usable synchronously, and cannot be used in
 * any asynchronous callbacks or after any `await` points.
 *
 * @param injector the injector which will satisfy calls to [`inject`](api/core/inject) while `fn`
 *     is executing
 * @param fn the closure to be run in the context of `injector`
 * @returns the return value of the function, if any
 * @publicApi
 */
export declare function runInInjectionContext<ReturnT>(injector: Injector, fn: () => ReturnT): ReturnT;

/**
 * Sanitizer is used by the views to sanitize potentially dangerous values.
 *
 * @publicApi
 */
export declare abstract class Sanitizer {
    abstract sanitize(context: SecurityContext, value: {} | string | null): string | null;
    /** @nocollapse */
    static ɵprov: unknown;
}

/**
 * Function used to sanitize the value before writing it into the renderer.
 */
declare type SanitizerFn = (value: any, tagName?: string, propName?: string) => string | TrustedHTML | TrustedScript | TrustedScriptURL;


/**
 * Abstraction that encompasses any kind of effect that can be scheduled.
 */
declare interface SchedulableEffect {
    run(): void;
    zone: {
        run<T>(fn: () => T): T;
    } | null;
}


/**
 * A schema definition associated with an NgModule.
 *
 * @see {@link NgModule}
 * @see {@link CUSTOM_ELEMENTS_SCHEMA}
 * @see {@link NO_ERRORS_SCHEMA}
 *
 * @param name The name of a defined schema.
 *
 * @publicApi
 */
export declare interface SchemaMetadata {
    name: string;
}

/**
 * Represents the set of dependencies of a type in a certain context.
 */
declare interface ScopeData {
    pipes: Set<PipeType<any>>;
    directives: Set<ɵDirectiveType<any> | ɵComponentType<any> | Type<any>>;
    /**
     * If true it indicates that calculating this scope somehow was not successful. The consumers
     * should interpret this as empty dependencies. The application of this flag is when calculating
     * scope recursively, the presence of this flag in a scope dependency implies that the scope is
     * also poisoned and thus we can return immediately without having to continue the recursion. The
     * reason for this error is displayed as an error message in the console as per JIT behavior
     * today. In addition to that, in local compilation the other build/compilations run in parallel
     * with local compilation may or may not reveal some details about the error as well.
     */
    isPoisoned?: boolean;
}


/**
 * A SecurityContext marks a location that has dangerous security implications, e.g. a DOM property
 * like `innerHTML` that could cause Cross Site Scripting (XSS) security bugs when improperly
 * handled.
 *
 * See DomSanitizer for more details on security in Angular applications.
 *
 * @publicApi
 */
export declare enum SecurityContext {
    NONE = 0,
    HTML = 1,
    STYLE = 2,
    SCRIPT = 3,
    URL = 4,
    RESOURCE_URL = 5
}

/** Flags used to build up CssSelectors */
declare const enum SelectorFlags {
    /** Indicates this is the beginning of a new negative selector */
    NOT = 1,
    /** Mode for matching attributes */
    ATTRIBUTE = 2,
    /** Mode for matching tag names */
    ELEMENT = 4,
    /** Mode for matching class names */
    CLASS = 8
}

/**
 * Type of the Self metadata.
 *
 * @publicApi
 */
export declare interface Self {
}

/**
 * Self decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Self: SelfDecorator;

/**
 * Type of the Self decorator / constructor function.
 *
 * @publicApi
 */
export declare interface SelfDecorator {
    /**
     * Parameter decorator to be used on constructor parameters,
     * which tells the DI framework to start dependency resolution from the local injector.
     *
     * Resolution works upward through the injector hierarchy, so the children
     * of this class must configure their own providers or be prepared for a `null` result.
     *
     * @usageNotes
     *
     * In the following example, the dependency can be resolved
     * by the local injector when instantiating the class itself, but not
     * when instantiating a child.
     *
     * {@example core/di/ts/metadata_spec.ts region='Self'}
     *
     * @see {@link SkipSelf}
     * @see {@link Optional}
     *
     */
    (): any;
    new (): Self;
}

/**
 * Serialized data structure that contains relevant hydration
 * annotation information about a view that is a part of a
 * ViewContainer collection.
 */
declare interface SerializedContainerView extends SerializedView {
    /**
     * Unique id that represents a TView that was used to create
     * a given instance of a view:
     *  - TViewType.Embedded: a unique id generated during serialization on the server
     *  - TViewType.Component: an id generated based on component properties
     *                        (see `getComponentId` function for details)
     */
    [TEMPLATE_ID]: string;
    /**
     * Number of root nodes that belong to this view.
     * This information is needed to effectively traverse the DOM tree
     * and identify segments that belong to different views.
     */
    [NUM_ROOT_NODES]: number;
    /**
     * Number of times this view is repeated.
     * This is used to avoid serializing and sending the same hydration
     * information about similar views (for example, produced by *ngFor).
     */
    [MULTIPLIER]?: number;
}

/**
 * Represents element containers within this view, stored as key-value pairs
 * where key is an index of a container in an LView (also used in the
 * `elementContainerStart` instruction), the value is the number of root nodes
 * in this container. This information is needed to locate an anchor comment
 * node that goes after all container nodes.
 */
declare interface SerializedElementContainers {
    [key: number]: number;
}

/**
 * Serialized data structure that contains relevant hydration
 * annotation information that describes a given hydration boundary
 * (e.g. a component).
 */
declare interface SerializedView {
    /**
     * Serialized information about <ng-container>s.
     */
    [ELEMENT_CONTAINERS]?: SerializedElementContainers;
    /**
     * Serialized information about templates.
     * Key-value pairs where a key is an index of the corresponding
     * `template` instruction and the value is a unique id that can
     * be used during hydration to identify that template.
     */
    [TEMPLATES]?: Record<number, string>;
    /**
     * Serialized information about view containers.
     * Key-value pairs where a key is an index of the corresponding
     * LContainer entry within an LView, and the value is a list
     * of serialized information about views within this container.
     */
    [CONTAINERS]?: Record<number, SerializedContainerView[]>;
    /**
     * Serialized information about nodes in a template.
     * Key-value pairs where a key is an index of the corresponding
     * DOM node in an LView and the value is a path that describes
     * the location of this node (as a set of navigation instructions).
     */
    [NODES]?: Record<number, string>;
    /**
     * A list of ids which represents a set of nodes disconnected
     * from the DOM tree at the serialization time, but otherwise
     * present in the internal data structures.
     *
     * This information is used to avoid triggering the hydration
     * logic for such nodes and instead use a regular "creation mode".
     */
    [DISCONNECTED_NODES]?: number[];
    /**
     * Serialized information about i18n blocks in a template.
     * Key-value pairs where a key is an index of the corresponding
     * i18n entry within an LView, and the value is a list of
     * active ICU cases.
     */
    [I18N_DATA]?: Record<number, number[]>;
    /**
     * If this view represents a `@defer` block, this field contains
     * unique id of the block.
     */
    [DEFER_BLOCK_ID]?: string;
    /**
     * This field represents a status, based on the `DeferBlockState` enum.
     */
    [DEFER_BLOCK_STATE]?: number;
}

/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 * @publicApi
 */
export declare function setTestabilityGetter(getter: GetTestability): void;

/**
 * A reactive value which notifies consumers of any changes.
 *
 * Signals are functions which returns their current value. To access the current value of a signal,
 * call it.
 *
 * Ordinary values can be turned into `Signal`s with the `signal` function.
 */
export declare type Signal<T> = (() => T) & {
    [ɵSIGNAL]: unknown;
};

/**
 * Create a `Signal` that can be set or updated directly.
 */
export declare function signal<T>(initialValue: T, options?: CreateSignalOptions<T>): WritableSignal<T>;


/**
 * Represents a basic change from a previous to a new value for a single
 * property on a directive instance. Passed as a value in a
 * {@link SimpleChanges} object to the `ngOnChanges` hook.
 *
 * @see {@link OnChanges}
 *
 * @publicApi
 */
export declare class SimpleChange {
    previousValue: any;
    currentValue: any;
    firstChange: boolean;
    constructor(previousValue: any, currentValue: any, firstChange: boolean);
    /**
     * Check whether the new value is the first value assigned.
     */
    isFirstChange(): boolean;
}

/**
 * A hashtable of changes represented by {@link SimpleChange} objects stored
 * at the declared property name they belong to on a Directive or Component. This is
 * the type passed to the `ngOnChanges` hook.
 *
 * @see {@link OnChanges}
 *
 * @publicApi
 */
export declare interface SimpleChanges {
    [propName: string]: SimpleChange;
}

/**
 * Internal type for a single provider in a deep provider array.
 */
declare type SingleProvider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider | StaticClassProvider;

/**
 * Type of the `SkipSelf` metadata.
 *
 * @publicApi
 */
export declare interface SkipSelf {
}

/**
 * `SkipSelf` decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const SkipSelf: SkipSelfDecorator;

/**
 * Type of the `SkipSelf` decorator / constructor function.
 *
 * @publicApi
 */
export declare interface SkipSelfDecorator {
    /**
     * Parameter decorator to be used on constructor parameters,
     * which tells the DI framework to start dependency resolution from the parent injector.
     * Resolution works upward through the injector hierarchy, so the local injector
     * is not checked for a provider.
     *
     * @usageNotes
     *
     * In the following example, the dependency can be resolved when
     * instantiating a child, but not when instantiating the class itself.
     *
     * {@example core/di/ts/metadata_spec.ts region='SkipSelf'}
     *
     * @see [Dependency Injection guide](guide/di/di-in-action#skip).
     * @see {@link Self}
     * @see {@link Optional}
     *
     */
    (): any;
    new (): SkipSelf;
}

/**
 * Represents scope data for standalone component as calculated during runtime by the deps tracker.
 */
declare interface StandaloneComponentScope {
    compilation: StandaloneCompScopeData;
}

/**
 * Represents scope data for standalone components as calculated during runtime by the deps
 * tracker.
 */
declare interface StandaloneCompScopeData extends ScopeData {
    ngModules: Set<ɵNgModuleType<any>>;
}


/**
 * A type-safe key to use with `TransferState`.
 *
 * Example:
 *
 * ```ts
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
export declare type StateKey<T> = string & {
    __not_a_string: never;
    __value_type?: T;
};

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='StaticClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {@example core/di/ts/provider_spec.ts region='StaticClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface StaticClassProvider extends StaticClassSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 * Base for `StaticClassProvider` decorator.
 *
 * @publicApi
 */
export declare interface StaticClassSansProvider {
    /**
     * An optional class to instantiate for the `token`. By default, the `provide`
     * class is instantiated.
     */
    useClass: Type<any>;
    /**
     * A list of `token`s to be resolved by the injector. The list of values is then
     * used as arguments to the `useClass` constructor.
     */
    deps: any[];
}

/**
 * Describes how an `Injector` should be configured as static (that is, without reflection).
 * A static provider provides tokens to an injector for various types of dependencies.
 *
 * @see {@link Injector.create()}
 * @see [Dependency Injection Guide](guide/di/dependency-injection-providers).
 *
 * @publicApi
 */
export declare type StaticProvider = ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider | any[];

/**
 * Options to the `resource` function, for creating a resource.
 *
 * @experimental
 */
export declare interface StreamingResourceOptions<T, R> extends BaseResourceOptions<T, R> {
    /**
     * Loading function which returns a `Promise` of a signal of the resource's value for a given
     * request, which can change over time as new values are received from a stream.
     */
    stream: ResourceStreamingLoader<T, R>;
    /**
     * Cannot specify `stream` and `loader` at the same time.
     */
    loader?: never;
}

declare const T_HOST = 5;

/**
 * A combination of:
 * - Attribute names and values.
 * - Special markers acting as flags to alter attributes processing.
 * - Parsed ngProjectAs selectors.
 */
declare type TAttributes = (string | ɵAttributeMarker | CssSelector)[];

/**
 * Constants that are associated with a view. Includes:
 * - Attribute arrays.
 * - Local definition arrays.
 * - Translated messages (i18n).
 */
declare type TConstants = (TAttributes | string)[];

/**
 * Factory function that returns an array of consts. Consts can be represented as a function in
 * case any additional statements are required to define consts in the list. An example is i18n
 * where additional i18n calls are generated, which should be executed when consts are requested
 * for the first time.
 */
declare type TConstantsFactory = () => TConstants;

/**
 * TConstants type that describes how the `consts` field is generated on ComponentDef: it can be
 * either an array or a factory function that returns that array.
 */
declare type TConstantsOrFactory = TConstants | TConstantsFactory;

/** Static data for an LContainer */
declare interface TContainerNode extends TNode {
    /**
     * Index in the data[] array.
     *
     * If it's -1, this is a dynamically created container node that isn't stored in
     * data[] (e.g. when you inject ViewContainerRef) .
     */
    index: number;
    child: null;
    /**
     * Container nodes will have parents unless:
     *
     * - They are the first node of a component or embedded view
     * - They are dynamically created
     */
    parent: TElementNode | TElementContainerNode | null;
    tView: TView | null;
    projection: null;
    value: null;
}

/**
 * Static data that corresponds to the instance-specific data array on an LView.
 *
 * Each node's static data is stored in tData at the same index that it's stored
 * in the data array.  Any nodes that do not have static data store a null value in
 * tData to avoid a sparse array.
 *
 * Each pipe's definition is stored here at the same index as its pipe instance in
 * the data array.
 *
 * Each host property's name is stored here at the same index as its value in the
 * data array.
 *
 * Each property binding name is stored here at the same index as its value in
 * the data array. If the binding is an interpolation, the static string values
 * are stored parallel to the dynamic values. Example:
 *
 * id="prefix {{ v0 }} a {{ v1 }} b {{ v2 }} suffix"
 *
 * LView       |   TView.data
 *------------------------
 *  v0 value   |   'a'
 *  v1 value   |   'b'
 *  v2 value   |   id � prefix � suffix
 *
 * Injector bloom filters are also stored here.
 */
declare type TData = (TNode | ɵPipeDef<any> | ɵDirectiveDef<any> | ɵComponentDef<any> | number | TStylingRange | TStylingKey | ProviderToken<any> | TI18n | I18nUpdateOpCodes | TIcu | null | string | TDeferBlockDetails)[];

/**
 * Describes the data shared across all instances of a defer block.
 */
declare interface TDeferBlockDetails {
    /**
     * Index in an LView and TData arrays where a template for the primary content
     * can be found.
     */
    primaryTmplIndex: number;
    /**
     * Index in an LView and TData arrays where a template for the loading block can be found.
     */
    loadingTmplIndex: number | null;
    /**
     * Extra configuration parameters (such as `after` and `minimum`) for the loading block.
     */
    loadingBlockConfig: DeferredLoadingBlockConfig | null;
    /**
     * Index in an LView and TData arrays where a template for the placeholder block can be found.
     */
    placeholderTmplIndex: number | null;
    /**
     * Extra configuration parameters (such as `after` and `minimum`) for the placeholder block.
     */
    placeholderBlockConfig: DeferredPlaceholderBlockConfig | null;
    /**
     * Index in an LView and TData arrays where a template for the error block can be found.
     */
    errorTmplIndex: number | null;
    /**
     * Compiler-generated function that loads all dependencies for a defer block.
     */
    dependencyResolverFn: DependencyResolverFn | null;
    /**
     * Keeps track of the current loading state of defer block dependencies.
     */
    loadingState: DeferDependenciesLoadingState;
    /**
     * Dependency loading Promise. This Promise is helpful for cases when there
     * are multiple instances of a defer block (e.g. if it was used inside of an *ngFor),
     * which all await the same set of dependencies.
     */
    loadingPromise: Promise<unknown> | null;
    /**
     * List of providers collected from all NgModules that were imported by
     * standalone components used within this defer block.
     */
    providers: Provider[] | null;
    /**
     * List of hydrate triggers for a given block
     */
    hydrateTriggers: Map<DeferBlockTrigger, HydrateTriggerDetails | null> | null;
    /**
     * Defer block flags, which should be used for all
     * instances of a given defer block (the flags that should be
     * placed into the `TDeferDetails` at runtime).
     */
    flags: TDeferDetailsFlags;
    /**
     * Tracks debugging information about the deferred block.
     */
    debug: {
        /** Text representations of the block's triggers. */
        triggers?: Set<string>;
    } | null;
}

/**
 * Specifies defer block flags, which should be used for all
 * instances of a given defer block (the flags that should be
 * placed into the `TDeferDetails` at runtime).
 */
declare const enum TDeferDetailsFlags {
    Default = 0,
    /**
     * Whether or not the defer block has hydrate triggers.
     */
    HasHydrateTriggers = 1
}

/** Static data for an <ng-container> */
declare interface TElementContainerNode extends TNode {
    /** Index in the LView[] array. */
    index: number;
    child: TElementNode | TTextNode | TContainerNode | TElementContainerNode | TProjectionNode | null;
    parent: TElementNode | TElementContainerNode | null;
    tView: null;
    projection: null;
}

/** Static data for an element  */
declare interface TElementNode extends TNode {
    /** Index in the data[] array */
    index: number;
    child: TElementNode | TTextNode | TElementContainerNode | TContainerNode | TProjectionNode | null;
    /**
     * Element nodes will have parents unless they are the first node of a component or
     * embedded view (which means their parent is in a different view and must be
     * retrieved using viewData[HOST_NODE]).
     */
    parent: TElementNode | TElementContainerNode | null;
    tView: null;
    /**
     * If this is a component TNode with projection, this will be an array of projected
     * TNodes or native nodes (see TNode.projection for more info). If it's a regular element node
     * or a component without projection, it will be null.
     */
    projection: (TNode | RNode[])[] | null;
    /**
     * Stores TagName
     */
    value: string;
}

declare const TEMPLATE_ID = "i";

/**
 * Represents an embedded template that can be used to instantiate embedded views.
 * To instantiate embedded views based on a template, use the `ViewContainerRef`
 * method `createEmbeddedView()`.
 *
 * Access a `TemplateRef` instance by placing a directive on an `<ng-template>`
 * element (or directive prefixed with `*`). The `TemplateRef` for the embedded view
 * is injected into the constructor of the directive,
 * using the `TemplateRef` token.
 *
 * You can also use a `Query` to find a `TemplateRef` associated with
 * a component or a directive.
 *
 * @see {@link ViewContainerRef}
 *
 * @publicApi
 */
export declare abstract class TemplateRef<C> {
    /**
     * The anchor element in the parent view for this embedded view.
     *
     * The data-binding and [injection contexts](guide/di/dependency-injection-context) of embedded
     * views created from this `TemplateRef` inherit from the contexts of this location.
     *
     * Typically new embedded views are attached to the view container of this location, but in
     * advanced use-cases, the view can be attached to a different container while keeping the
     * data-binding and injection context from the original location.
     *
     */
    abstract readonly elementRef: ElementRef;
    /**
     * Instantiates an unattached embedded view based on this template.
     * @param context The data-binding context of the embedded view, as declared
     * in the `<ng-template>` usage.
     * @param injector Injector to be used within the embedded view.
     * @returns The new embedded view object.
     */
    abstract createEmbeddedView(context: C, injector?: Injector): EmbeddedViewRef<C>;
}

declare const TEMPLATES = "t";

/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser.
 *
 * Angular applications bootstrapped using an NgModule (via `@NgModule.bootstrap` field) will also
 * instantiate Testability by default (in both development and production modes).
 *
 * For applications bootstrapped using the `bootstrapApplication` function, Testability is not
 * included by default. You can include it into your applications by getting the list of necessary
 * providers using the `provideProtractorTestingSupport()` function and adding them into the
 * `options.providers` array. Example:
 *
 * ```ts
 * import {provideProtractorTestingSupport} from '@angular/platform-browser';
 *
 * await bootstrapApplication(RootComponent, providers: [provideProtractorTestingSupport()]);
 * ```
 *
 * @publicApi
 */
export declare class Testability implements PublicTestability {
    private _ngZone;
    private registry;
    private _isZoneStable;
    private _callbacks;
    private taskTrackingZone;
    constructor(_ngZone: NgZone, registry: TestabilityRegistry, testabilityGetter: GetTestability);
    private _watchAngularEvents;
    /**
     * Whether an associated application is stable
     */
    isStable(): boolean;
    private _runCallbacksIfReady;
    private getPendingTasks;
    private addCallback;
    /**
     * Wait for the application to be stable with a timeout. If the timeout is reached before that
     * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
     *
     * @param doneCb The callback to invoke when Angular is stable or the timeout expires
     *    whichever comes first.
     * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
     *    specified, whenStable() will wait forever.
     * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
     *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
     *    and no further updates will be issued.
     */
    whenStable(doneCb: Function, timeout?: number, updateCb?: Function): void;
    /**
     * Find providers by name
     * @param using The root element to search from
     * @param provider The name of binding variable
     * @param exactMatch Whether using exactMatch
     */
    findProviders(using: any, provider: string, exactMatch: boolean): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<Testability, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Testability>;
}

/**
 * A global registry of {@link Testability} instances for specific elements.
 * @publicApi
 */
export declare class TestabilityRegistry {
    /**
     * Registers an application with a testability hook so that it can be tracked
     * @param token token of application, root element
     * @param testability Testability hook
     */
    registerApplication(token: any, testability: Testability): void;
    /**
     * Unregisters an application.
     * @param token token of application, root element
     */
    unregisterApplication(token: any): void;
    /**
     * Unregisters all applications
     */
    unregisterAllApplications(): void;
    /**
     * Get a testability hook associated with the application
     * @param elem root element
     */
    getTestability(elem: any): Testability | null;
    /**
     * Get all registered testabilities
     */
    getAllTestabilities(): Testability[];
    /**
     * Get all registered applications(root elements)
     */
    getAllRootElements(): any[];
    /**
     * Find testability of a node in the Tree
     * @param elem node
     * @param findInAncestors whether finding testability in ancestors if testability was not found in
     * current node
     */
    findTestabilityInTree(elem: Node, findInAncestors?: boolean): Testability | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<TestabilityRegistry, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TestabilityRegistry>;
}

/**
 * Store information for the i18n translation block.
 */
declare interface TI18n {
    /**
     * A set of OpCodes which will create the Text Nodes and ICU anchors for the translation blocks.
     *
     * NOTE: The ICU anchors are filled in with ICU Update OpCode.
     */
    create: I18nCreateOpCodes;
    /**
     * A set of OpCodes which will be executed on each change detection to determine if any changes to
     * DOM are required.
     */
    update: I18nUpdateOpCodes;
    /**
     * An AST representing the translated message. This is used for hydration (and serialization),
     * while the Update and Create OpCodes are used at runtime.
     */
    ast: Array<I18nNode>;
    /**
     * Index of a parent TNode, which represents a host node for this i18n block.
     */
    parentTNodeIndex: number;
}

declare interface TIcu {
    /**
     * Defines the ICU type of `select` or `plural`
     */
    type: IcuType;
    /**
     * Index in `LView` where the anchor node is stored. `<!-- ICU 0:0 -->`
     */
    anchorIdx: number;
    /**
     * Currently selected ICU case pointer.
     *
     * `lView[currentCaseLViewIndex]` stores the currently selected case. This is needed to know how
     * to clean up the current case when transitioning no the new case.
     *
     * If the value stored is:
     * `null`: No current case selected.
     *   `<0`: A flag which means that the ICU just switched and that `icuUpdate` must be executed
     *         regardless of the `mask`. (After the execution the flag is cleared)
     *   `>=0` A currently selected case index.
     */
    currentCaseLViewIndex: number;
    /**
     * A list of case values which the current ICU will try to match.
     *
     * The last value is `other`
     */
    cases: any[];
    /**
     * A set of OpCodes to apply in order to build up the DOM render tree for the ICU
     */
    create: IcuCreateOpCodes[];
    /**
     * A set of OpCodes to apply in order to destroy the DOM render tree for the ICU.
     */
    remove: I18nRemoveOpCodes[];
    /**
     * A set of OpCodes to apply in order to update the DOM render tree for the ICU bindings.
     */
    update: I18nUpdateOpCodes[];
}

/**
 * Binding data (flyweight) for a particular node that is shared between all templates
 * of a specific type.
 *
 * If a property is:
 *    - PropertyAliases: that property's data was generated and this is it
 *    - Null: that property's data was already generated and nothing was found.
 *    - Undefined: that property's data has not yet been generated
 *
 * see: https://en.wikipedia.org/wiki/Flyweight_pattern for more on the Flyweight pattern
 */
declare interface TNode {
    /** The type of the TNode. See TNodeType. */
    type: TNodeType;
    /**
     * Index of the TNode in TView.data and corresponding native element in LView.
     *
     * This is necessary to get from any TNode to its corresponding native element when
     * traversing the node tree.
     *
     * If index is -1, this is a dynamically created container node or embedded view node.
     */
    index: number;
    /**
     * Insert before existing DOM node index.
     *
     * When DOM nodes are being inserted, normally they are being appended as they are created.
     * Under i18n case, the translated text nodes are created ahead of time as part of the
     * `ɵɵi18nStart` instruction which means that this `TNode` can't just be appended and instead
     * needs to be inserted using `insertBeforeIndex` semantics.
     *
     * Additionally sometimes it is necessary to insert new text nodes as a child of this `TNode`. In
     * such a case the value stores an array of text nodes to insert.
     *
     * Example:
     * ```html
     * <div i18n>
     *   Hello <span>World</span>!
     * </div>
     * ```
     * In the above example the `ɵɵi18nStart` instruction can create `Hello `, `World` and `!` text
     * nodes. It can also insert `Hello ` and `!` text node as a child of `<div>`, but it can't
     * insert `World` because the `<span>` node has not yet been created. In such a case the
     * `<span>` `TNode` will have an array which will direct the `<span>` to not only insert
     * itself in front of `!` but also to insert the `World` (created by `ɵɵi18nStart`) into
     * `<span>` itself.
     *
     * Pseudo code:
     * ```ts
     *   if (insertBeforeIndex === null) {
     *     // append as normal
     *   } else if (Array.isArray(insertBeforeIndex)) {
     *     // First insert current `TNode` at correct location
     *     const currentNode = lView[this.index];
     *     parentNode.insertBefore(currentNode, lView[this.insertBeforeIndex[0]]);
     *     // Now append all of the children
     *     for(let i=1; i<this.insertBeforeIndex; i++) {
     *       currentNode.appendChild(lView[this.insertBeforeIndex[i]]);
     *     }
     *   } else {
     *     parentNode.insertBefore(lView[this.index], lView[this.insertBeforeIndex])
     *   }
     * ```
     * - null: Append as normal using `parentNode.appendChild`
     * - `number`: Append using
     *      `parentNode.insertBefore(lView[this.index], lView[this.insertBeforeIndex])`
     *
     * *Initialization*
     *
     * Because `ɵɵi18nStart` executes before nodes are created, on `TView.firstCreatePass` it is not
     * possible for `ɵɵi18nStart` to set the `insertBeforeIndex` value as the corresponding `TNode`
     * has not yet been created. For this reason the `ɵɵi18nStart` creates a `TNodeType.Placeholder`
     * `TNode` at that location. See `TNodeType.Placeholder` for more information.
     */
    insertBeforeIndex: InsertBeforeIndex;
    /**
     * The index of the closest injector in this node's LView.
     *
     * If the index === -1, there is no injector on this node or any ancestor node in this view.
     *
     * If the index !== -1, it is the index of this node's injector OR the index of a parent
     * injector in the same view. We pass the parent injector index down the node tree of a view so
     * it's possible to find the parent injector without walking a potentially deep node tree.
     * Injector indices are not set across view boundaries because there could be multiple component
     * hosts.
     *
     * If tNode.injectorIndex === tNode.parent.injectorIndex, then the index belongs to a parent
     * injector.
     */
    injectorIndex: number;
    /** Stores starting index of the directives. */
    directiveStart: number;
    /**
     * Stores final exclusive index of the directives.
     *
     * The area right behind the `directiveStart-directiveEnd` range is used to allocate the
     * `HostBindingFunction` `vars` (or null if no bindings.) Therefore `directiveEnd` is used to set
     * `LFrame.bindingRootIndex` before `HostBindingFunction` is executed.
     */
    directiveEnd: number;
    /**
     * Offset from the `directiveStart` at which the component (one at most) of the node is stored.
     * Set to -1 if no components have been applied to the node. Component index can be found using
     * `directiveStart + componentOffset`.
     */
    componentOffset: number;
    /**
     * Stores the last directive which had a styling instruction.
     *
     * Initial value of this is `-1` which means that no `hostBindings` styling instruction has
     * executed. As `hostBindings` instructions execute they set the value to the index of the
     * `DirectiveDef` which contained the last `hostBindings` styling instruction.
     *
     * Valid values are:
     * - `-1` No `hostBindings` instruction has executed.
     * - `directiveStart <= directiveStylingLast < directiveEnd`: Points to the `DirectiveDef` of
     * the last styling instruction which executed in the `hostBindings`.
     *
     * This data is needed so that styling instructions know which static styling data needs to be
     * collected from the `DirectiveDef.hostAttrs`. A styling instruction needs to collect all data
     * since last styling instruction.
     */
    directiveStylingLast: number;
    /**
     * Stores indexes of property bindings. This field is only set in the ngDevMode and holds
     * indexes of property bindings so TestBed can get bound property metadata for a given node.
     */
    propertyBindings: number[] | null;
    /**
     * Stores if Node isComponent, isProjected, hasContentQuery, hasClassInput and hasStyleInput
     * etc.
     */
    flags: TNodeFlags;
    /**
     * This number stores two values using its bits:
     *
     * - the index of the first provider on that node (first 16 bits)
     * - the count of view providers from the component on this node (last 16 bits)
     */
    providerIndexes: TNodeProviderIndexes;
    /**
     * The value name associated with this node.
     * if type:
     *   `TNodeType.Text`: text value
     *   `TNodeType.Element`: tag name
     *   `TNodeType.ICUContainer`: `TIcu`
     */
    value: any;
    /**
     * Attributes associated with an element. We need to store attributes to support various
     * use-cases (attribute injection, content projection with selectors, directives matching).
     * Attributes are stored statically because reading them from the DOM would be way too slow for
     * content projection and queries.
     *
     * Since attrs will always be calculated first, they will never need to be marked undefined by
     * other instructions.
     *
     * For regular attributes a name of an attribute and its value alternate in the array.
     * e.g. ['role', 'checkbox']
     * This array can contain flags that will indicate "special attributes" (attributes with
     * namespaces, attributes extracted from bindings and outputs).
     */
    attrs: TAttributes | null;
    /**
     * Same as `TNode.attrs` but contains merged data across all directive host bindings.
     *
     * We need to keep `attrs` as unmerged so that it can be used for attribute selectors.
     * We merge attrs here so that it can be used in a performant way for initial rendering.
     *
     * The `attrs` are merged in first pass in following order:
     * - Component's `hostAttrs`
     * - Directives' `hostAttrs`
     * - Template `TNode.attrs` associated with the current `TNode`.
     */
    mergedAttrs: TAttributes | null;
    /**
     * A set of local names under which a given element is exported in a template and
     * visible to queries. An entry in this array can be created for different reasons:
     * - an element itself is referenced, ex.: `<div #foo>`
     * - a component is referenced, ex.: `<my-cmpt #foo>`
     * - a directive is referenced, ex.: `<my-cmpt #foo="directiveExportAs">`.
     *
     * A given element might have different local names and those names can be associated
     * with a directive. We store local names at even indexes while odd indexes are reserved
     * for directive index in a view (or `-1` if there is no associated directive).
     *
     * Some examples:
     * - `<div #foo>` => `["foo", -1]`
     * - `<my-cmpt #foo>` => `["foo", myCmptIdx]`
     * - `<my-cmpt #foo #bar="directiveExportAs">` => `["foo", myCmptIdx, "bar", directiveIdx]`
     * - `<div #foo #bar="directiveExportAs">` => `["foo", -1, "bar", directiveIdx]`
     */
    localNames: (string | number)[] | null;
    /** Information about input properties that need to be set once from attribute data. */
    initialInputs: InitialInputData | null | undefined;
    /**
     * Input data for all directives on this node. `null` means that there are no directives with
     * inputs on this node.
     */
    inputs: NodeInputBindings | null;
    /**
     * Output data for all directives on this node. `null` means that there are no directives with
     * outputs on this node.
     */
    outputs: NodeOutputBindings | null;
    /**
     * The TView attached to this node.
     *
     * If this TNode corresponds to an LContainer with a template (e.g. structural
     * directive), the template's TView will be stored here.
     *
     * If this TNode corresponds to an element, tView will be `null`.
     */
    tView: TView | null;
    /**
     * The next sibling node. Necessary so we can propagate through the root nodes of a view
     * to insert them or remove them from the DOM.
     */
    next: TNode | null;
    /**
     * The previous sibling node.
     * This simplifies operations when we need a pointer to the previous node.
     */
    prev: TNode | null;
    /**
     * The next projected sibling. Since in Angular content projection works on the node-by-node
     * basis the act of projecting nodes might change nodes relationship at the insertion point
     * (target view). At the same time we need to keep initial relationship between nodes as
     * expressed in content view.
     */
    projectionNext: TNode | null;
    /**
     * First child of the current node.
     *
     * For component nodes, the child will always be a ContentChild (in same view).
     * For embedded view nodes, the child will be in their child view.
     */
    child: TNode | null;
    /**
     * Parent node (in the same view only).
     *
     * We need a reference to a node's parent so we can append the node to its parent's native
     * element at the appropriate time.
     *
     * If the parent would be in a different view (e.g. component host), this property will be null.
     * It's important that we don't try to cross component boundaries when retrieving the parent
     * because the parent will change (e.g. index, attrs) depending on where the component was
     * used (and thus shouldn't be stored on TNode). In these cases, we retrieve the parent through
     * LView.node instead (which will be instance-specific).
     *
     * If this is an inline view node (V), the parent will be its container.
     */
    parent: TElementNode | TContainerNode | null;
    /**
     * List of projected TNodes for a given component host element OR index into the said nodes.
     *
     * For easier discussion assume this example:
     * `<parent>`'s view definition:
     * ```html
     * <child id="c1">content1</child>
     * <child id="c2"><span>content2</span></child>
     * ```
     * `<child>`'s view definition:
     * ```html
     * <ng-content id="cont1"></ng-content>
     * ```
     *
     * If `Array.isArray(projection)` then `TNode` is a host element:
     * - `projection` stores the content nodes which are to be projected.
     *    - The nodes represent categories defined by the selector: For example:
     *      `<ng-content/><ng-content select="abc"/>` would represent the heads for `<ng-content/>`
     *      and `<ng-content select="abc"/>` respectively.
     *    - The nodes we store in `projection` are heads only, we used `.next` to get their
     *      siblings.
     *    - The nodes `.next` is sorted/rewritten as part of the projection setup.
     *    - `projection` size is equal to the number of projections `<ng-content>`. The size of
     *      `c1` will be `1` because `<child>` has only one `<ng-content>`.
     * - we store `projection` with the host (`c1`, `c2`) rather than the `<ng-content>` (`cont1`)
     *   because the same component (`<child>`) can be used in multiple locations (`c1`, `c2`) and
     * as a result have different set of nodes to project.
     * - without `projection` it would be difficult to efficiently traverse nodes to be projected.
     *
     * If `typeof projection == 'number'` then `TNode` is a `<ng-content>` element:
     * - `projection` is an index of the host's `projection`Nodes.
     *   - This would return the first head node to project:
     *     `getHost(currentTNode).projection[currentTNode.projection]`.
     * - When projecting nodes the parent node retrieved may be a `<ng-content>` node, in which case
     *   the process is recursive in nature.
     *
     * If `projection` is of type `RNode[][]` than we have a collection of native nodes passed as
     * projectable nodes during dynamic component creation.
     */
    projection: (TNode | RNode[])[] | number | null;
    /**
     * A collection of all `style` static values for an element (including from host).
     *
     * This field will be populated if and when:
     *
     * - There are one or more initial `style`s on an element (e.g. `<div style="width:200px;">`)
     * - There are one or more initial `style`s on a directive/component host
     *   (e.g. `@Directive({host: {style: "width:200px;" } }`)
     */
    styles: string | null;
    /**
     * A collection of all `style` static values for an element excluding host sources.
     *
     * Populated when there are one or more initial `style`s on an element
     * (e.g. `<div style="width:200px;">`)
     * Must be stored separately from `tNode.styles` to facilitate setting directive
     * inputs that shadow the `style` property. If we used `tNode.styles` as is for shadowed inputs,
     * we would feed host styles back into directives as "inputs". If we used `tNode.attrs`, we
     * would have to concatenate the attributes on every template pass. Instead, we process once on
     * first create pass and store here.
     */
    stylesWithoutHost: string | null;
    /**
     * A `KeyValueArray` version of residual `styles`.
     *
     * When there are styling instructions than each instruction stores the static styling
     * which is of lower priority than itself. This means that there may be a higher priority
     * styling than the instruction.
     *
     * Imagine:
     * ```angular-ts
     * <div style="color: highest;" my-dir>
     *
     * @Directive({
     *   host: {
     *     style: 'color: lowest; ',
     *     '[styles.color]': 'exp' // ɵɵstyleProp('color', ctx.exp);
     *   }
     * })
     * ```
     *
     * In the above case:
     * - `color: lowest` is stored with `ɵɵstyleProp('color', ctx.exp);` instruction
     * -  `color: highest` is the residual and is stored here.
     *
     * - `undefined': not initialized.
     * - `null`: initialized but `styles` is `null`
     * - `KeyValueArray`: parsed version of `styles`.
     */
    residualStyles: KeyValueArray<any> | undefined | null;
    /**
     * A collection of all class static values for an element (including from host).
     *
     * This field will be populated if and when:
     *
     * - There are one or more initial classes on an element (e.g. `<div class="one two three">`)
     * - There are one or more initial classes on an directive/component host
     *   (e.g. `@Directive({host: {class: "SOME_CLASS" } }`)
     */
    classes: string | null;
    /**
     * A collection of all class static values for an element excluding host sources.
     *
     * Populated when there are one or more initial classes on an element
     * (e.g. `<div class="SOME_CLASS">`)
     * Must be stored separately from `tNode.classes` to facilitate setting directive
     * inputs that shadow the `class` property. If we used `tNode.classes` as is for shadowed
     * inputs, we would feed host classes back into directives as "inputs". If we used
     * `tNode.attrs`, we would have to concatenate the attributes on every template pass. Instead,
     * we process once on first create pass and store here.
     */
    classesWithoutHost: string | null;
    /**
     * A `KeyValueArray` version of residual `classes`.
     *
     * Same as `TNode.residualStyles` but for classes.
     *
     * - `undefined': not initialized.
     * - `null`: initialized but `classes` is `null`
     * - `KeyValueArray`: parsed version of `classes`.
     */
    residualClasses: KeyValueArray<any> | undefined | null;
    /**
     * Stores the head/tail index of the class bindings.
     *
     * - If no bindings, the head and tail will both be 0.
     * - If there are template bindings, stores the head/tail of the class bindings in the template.
     * - If no template bindings but there are host bindings, the head value will point to the last
     *   host binding for "class" (not the head of the linked list), tail will be 0.
     *
     * See: `style_binding_list.ts` for details.
     *
     * This is used by `insertTStylingBinding` to know where the next styling binding should be
     * inserted so that they can be sorted in priority order.
     */
    classBindings: TStylingRange;
    /**
     * Stores the head/tail index of the class bindings.
     *
     * - If no bindings, the head and tail will both be 0.
     * - If there are template bindings, stores the head/tail of the style bindings in the template.
     * - If no template bindings but there are host bindings, the head value will point to the last
     *   host binding for "style" (not the head of the linked list), tail will be 0.
     *
     * See: `style_binding_list.ts` for details.
     *
     * This is used by `insertTStylingBinding` to know where the next styling binding should be
     * inserted so that they can be sorted in priority order.
     */
    styleBindings: TStylingRange;
}

/**
 * Corresponds to the TNode.flags property.
 */
declare const enum TNodeFlags {
    /** Bit #1 - This bit is set if the node is a host for any directive (including a component) */
    isDirectiveHost = 1,
    /** Bit #2 - This bit is set if the node has been projected */
    isProjected = 2,
    /** Bit #3 - This bit is set if any directive on this node has content queries */
    hasContentQuery = 4,
    /** Bit #4 - This bit is set if the node has any "class" inputs */
    hasClassInput = 8,
    /** Bit #5 - This bit is set if the node has any "style" inputs */
    hasStyleInput = 16,
    /** Bit #6 - This bit is set if the node has been detached by i18n */
    isDetached = 32,
    /**
     * Bit #7 - This bit is set if the node has directives with host bindings.
     *
     * This flags allows us to guard host-binding logic and invoke it only on nodes
     * that actually have directives with host bindings.
     */
    hasHostBindings = 64,
    /**
     * Bit #8 - This bit is set if the node is a located inside skip hydration block.
     */
    inSkipHydrationBlock = 128
}

/**
 * Corresponds to the TNode.providerIndexes property.
 */
declare const enum TNodeProviderIndexes {
    /** The index of the first provider on this node is encoded on the least significant bits. */
    ProvidersStartIndexMask = 1048575,
    /**
     * The count of view providers from the component on this node is
     * encoded on the 20 most significant bits.
     */
    CptViewProvidersCountShift = 20,
    CptViewProvidersCountShifter = 1048576
}

/**
 * TNodeType corresponds to the {@link TNode} `type` property.
 *
 * NOTE: type IDs are such that we use each bit to denote a type. This is done so that we can easily
 * check if the `TNode` is of more than one type.
 *
 * `if (tNode.type === TNodeType.Text || tNode.type === TNode.Element)`
 * can be written as:
 * `if (tNode.type & (TNodeType.Text | TNodeType.Element))`
 *
 * However any given `TNode` can only be of one type.
 */
declare const enum TNodeType {
    /**
     * The TNode contains information about a DOM element aka {@link RText}.
     */
    Text = 1,
    /**
     * The TNode contains information about a DOM element aka {@link RElement}.
     */
    Element = 2,
    /**
     * The TNode contains information about an {@link LContainer} for embedded views.
     */
    Container = 4,
    /**
     * The TNode contains information about an `<ng-container>` element {@link RNode}.
     */
    ElementContainer = 8,
    /**
     * The TNode contains information about an `<ng-content>` projection
     */
    Projection = 16,
    /**
     * The TNode contains information about an ICU comment used in `i18n`.
     */
    Icu = 32,
    /**
     * Special node type representing a placeholder for future `TNode` at this location.
     *
     * I18n translation blocks are created before the element nodes which they contain. (I18n blocks
     * can span over many elements.) Because i18n `TNode`s (representing text) are created first they
     * often may need to point to element `TNode`s which are not yet created. In such a case we create
     * a `Placeholder` `TNode`. This allows the i18n to structurally link the `TNode`s together
     * without knowing any information about the future nodes which will be at that location.
     *
     * On `firstCreatePass` When element instruction executes it will try to create a `TNode` at that
     * location. Seeing a `Placeholder` `TNode` already there tells the system that it should reuse
     * existing `TNode` (rather than create a new one) and just update the missing information.
     */
    Placeholder = 64,
    /**
     * The TNode contains information about a `@let` declaration.
     */
    LetDeclaration = 128,
    AnyRNode = 3,// Text | Element
    AnyContainer = 12
}

/**
 * Type representing a set of TNodes that can have local refs (`#foo`) placed on them.
 */
declare type TNodeWithLocalRefs = TContainerNode | TElementNode | TElementContainerNode;

/** Static data for an LProjectionNode  */
declare interface TProjectionNode extends TNode {
    /** Index in the data[] array */
    child: null;
    /**
     * Projection nodes will have parents unless they are the first node of a component
     * or embedded view (which means their parent is in a different view and must be
     * retrieved using LView.node).
     */
    parent: TElementNode | TElementContainerNode | null;
    tView: null;
    /** Index of the projection node. (See TNode.projection for more info.) */
    projection: number;
    value: null;
}

/**
 * TQueries represent a collection of individual TQuery objects tracked in a given view. Most of the
 * methods on this interface are simple proxy methods to the corresponding functionality on TQuery.
 */
declare interface TQueries {
    /**
     * Adds a new TQuery to a collection of queries tracked in a given view.
     * @param tQuery
     */
    track(tQuery: TQuery): void;
    /**
     * Returns a TQuery instance for at the given index  in the queries array.
     * @param index
     */
    getByIndex(index: number): TQuery;
    /**
     * Returns the number of queries tracked in a given view.
     */
    length: number;
    /**
     * A proxy method that iterates over all the TQueries in a given TView and calls the corresponding
     * `elementStart` on each and every TQuery.
     * @param tView
     * @param tNode
     */
    elementStart(tView: TView, tNode: TNode): void;
    /**
     * A proxy method that iterates over all the TQueries in a given TView and calls the corresponding
     * `elementEnd` on each and every TQuery.
     * @param tNode
     */
    elementEnd(tNode: TNode): void;
    /**
     * A proxy method that iterates over all the TQueries in a given TView and calls the corresponding
     * `template` on each and every TQuery.
     * @param tView
     * @param tNode
     */
    template(tView: TView, tNode: TNode): void;
    /**
     * A proxy method that iterates over all the TQueries in a given TView and calls the corresponding
     * `embeddedTView` on each and every TQuery.
     * @param tNode
     */
    embeddedTView(tNode: TNode): TQueries | null;
}

/**
 * TQuery objects represent all the query-related data that remain the same from one view instance
 * to another and can be determined on the very first template pass. Most notably TQuery holds all
 * the matches for a given view.
 */
declare interface TQuery {
    /**
     * Query metadata extracted from query annotations.
     */
    metadata: TQueryMetadata;
    /**
     * Index of a query in a declaration view in case of queries propagated to en embedded view, -1
     * for queries declared in a given view. We are storing this index so we can find a parent query
     * to clone for an embedded view (when an embedded view is created).
     */
    indexInDeclarationView: number;
    /**
     * Matches collected on the first template pass. Each match is a pair of:
     * - TNode index;
     * - match index;
     *
     * A TNode index can be either:
     * - a positive number (the most common case) to indicate a matching TNode;
     * - a negative number to indicate that a given query is crossing a <ng-template> element and
     * results from views created based on TemplateRef should be inserted at this place.
     *
     * A match index is a number used to find an actual value (for a given node) when query results
     * are materialized. This index can have one of the following values:
     * - -2 - indicates that we need to read a special token (TemplateRef, ViewContainerRef etc.);
     * - -1 - indicates that we need to read a default value based on the node type (TemplateRef for
     * ng-template and ElementRef for other elements);
     * - a positive number - index of an injectable to be read from the element injector.
     */
    matches: number[] | null;
    /**
     * A flag indicating if a given query crosses an <ng-template> element. This flag exists for
     * performance reasons: we can notice that queries not crossing any <ng-template> elements will
     * have matches from a given view only (and adapt processing accordingly).
     */
    crossesNgTemplate: boolean;
    /**
     * A method call when a given query is crossing an element (or element container). This is where a
     * given TNode is matched against a query predicate.
     * @param tView
     * @param tNode
     */
    elementStart(tView: TView, tNode: TNode): void;
    /**
     * A method called when processing the elementEnd instruction - this is mostly useful to determine
     * if a given content query should match any nodes past this point.
     * @param tNode
     */
    elementEnd(tNode: TNode): void;
    /**
     * A method called when processing the template instruction. This is where a
     * given TContainerNode is matched against a query predicate.
     * @param tView
     * @param tNode
     */
    template(tView: TView, tNode: TNode): void;
    /**
     * A query-related method called when an embedded TView is created based on the content of a
     * <ng-template> element. We call this method to determine if a given query should be propagated
     * to the embedded view and if so - return a cloned TQuery for this embedded view.
     * @param tNode
     * @param childQueryIndex
     */
    embeddedTView(tNode: TNode, childQueryIndex: number): TQuery | null;
}

/**
 * An object representing query metadata extracted from query annotations.
 */
declare interface TQueryMetadata {
    predicate: ProviderToken<unknown> | string[];
    read: any;
    flags: QueryFlags;
}

/**
 * A function optionally passed into the `NgForOf` directive to customize how `NgForOf` uniquely
 * identifies items in an iterable.
 *
 * `NgForOf` needs to uniquely identify items in the iterable to correctly perform DOM updates
 * when items in the iterable are reordered, new items are added, or existing items are removed.
 *
 *
 * In all of these scenarios it is usually desirable to only update the DOM elements associated
 * with the items affected by the change. This behavior is important to:
 *
 * - preserve any DOM-specific UI state (like cursor position, focus, text selection) when the
 *   iterable is modified
 * - enable animation of item addition, removal, and iterable reordering
 * - preserve the value of the `<select>` element when nested `<option>` elements are dynamically
 *   populated using `NgForOf` and the bound iterable is updated
 *
 * A common use for custom `trackBy` functions is when the model that `NgForOf` iterates over
 * contains a property with a unique identifier. For example, given a model:
 *
 * ```ts
 * class User {
 *   id: number;
 *   name: string;
 *   ...
 * }
 * ```
 * a custom `trackBy` function could look like the following:
 * ```ts
 * function userTrackBy(index, user) {
 *   return user.id;
 * }
 * ```
 *
 * A custom `trackBy` function must have several properties:
 *
 * - be [idempotent](https://en.wikipedia.org/wiki/Idempotence) (be without side effects, and always
 * return the same value for a given input)
 * - return unique value for all unique inputs
 * - be fast
 *
 * @see [`NgForOf#ngForTrackBy`](api/common/NgForOf#ngForTrackBy)
 * @publicApi
 */
export declare interface TrackByFunction<T> {
    /**
     * @param index The index of the item within the iterable.
     * @param item The item in the iterable.
     */
    <U extends T>(index: number, item: T & U): any;
}

/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * The `TransferState` is available as an injectable token.
 * On the client, just inject this token using DI and use it, it will be lazily initialized.
 * On the server it's already included if `renderApplication` function is used. Otherwise, import
 * the `ServerTransferStateModule` module to make the `TransferState` available.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialized in a
 * non-lossy manner.
 *
 * @publicApi
 */
export declare class TransferState {
    /** @nocollapse */
    static ɵprov: unknown;
    private onSerializeCallbacks;
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     */
    get<T>(key: StateKey<T>, defaultValue: T): T;
    /**
     * Set the value corresponding to a key.
     */
    set<T>(key: StateKey<T>, value: T): void;
    /**
     * Remove a key from the store.
     */
    remove<T>(key: StateKey<T>): void;
    /**
     * Test whether a key exists in the store.
     */
    hasKey<T>(key: StateKey<T>): boolean;
    /**
     * Indicates whether the state is empty.
     */
    get isEmpty(): boolean;
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     */
    onSerialize<T>(key: StateKey<T>, callback: () => T): void;
    /**
     * Serialize the current state of the store to JSON.
     */
    toJson(): string;
}

/**
 * Use this token at bootstrap to provide the content of your translation file (`xtb`,
 * `xlf` or `xlf2`) when you want to translate your application in another language.
 *
 * See the [i18n guide](guide/i18n/merge) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```ts
 * import { TRANSLATIONS } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * // content of your translation file
 * const translations = '....';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS, useValue: translations }]
 * });
 * ```
 *
 * @publicApi
 */
export declare const TRANSLATIONS: InjectionToken<string>;

/**
 * Provide this token at bootstrap to set the format of your {@link TRANSLATIONS}: `xtb`,
 * `xlf` or `xlf2`.
 *
 * See the [i18n guide](guide/i18n/merge) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```ts
 * import { TRANSLATIONS_FORMAT } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }]
 * });
 * ```
 *
 * @publicApi
 */
export declare const TRANSLATIONS_FORMAT: InjectionToken<string>;


/**
 * @fileoverview
 * While Angular only uses Trusted Types internally for the time being,
 * references to Trusted Types could leak into our core.d.ts, which would force
 * anyone compiling against @angular/core to provide the @types/trusted-types
 * package in their compilation unit.
 *
 * Until https://github.com/microsoft/TypeScript/issues/30024 is resolved, we
 * will keep Angular's public API surface free of references to Trusted Types.
 * For internal and semi-private APIs that need to reference Trusted Types, the
 * minimal type definitions for the Trusted Types API provided by this module
 * should be used instead. They are marked as "declare" to prevent them from
 * being renamed by compiler optimization.
 *
 * Adapted from
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/trusted-types/index.d.ts
 * but restricted to the API surface used within Angular.
 */
declare type TrustedHTML = string & {
    __brand__: 'TrustedHTML';
};

declare type TrustedScript = string & {
    __brand__: 'TrustedScript';
};

declare type TrustedScriptURL = string & {
    __brand__: 'TrustedScriptURL';
};

/**
 * Value stored in the `TData` which is needed to re-concatenate the styling.
 *
 * See: `TStylingKeyPrimitive` and `TStylingStatic`
 */
declare type TStylingKey = TStylingKeyPrimitive | TStylingStatic;

/**
 * The primitive portion (`TStylingStatic` removed) of the value stored in the `TData` which is
 * needed to re-concatenate the styling.
 *
 * - `string`: Stores the property name. Used with `ɵɵstyleProp`/`ɵɵclassProp` instruction.
 * - `null`: Represents map, so there is no name. Used with `ɵɵstyleMap`/`ɵɵclassMap`.
 * - `false`: Represents an ignore case. This happens when `ɵɵstyleProp`/`ɵɵclassProp` instruction
 *   is combined with directive which shadows its input `@Input('class')`. That way the binding
 *   should not participate in the styling resolution.
 */
declare type TStylingKeyPrimitive = string | null | false;

/**
 * This is a branded number which contains previous and next index.
 *
 * When we come across styling instructions we need to store the `TStylingKey` in the correct
 * order so that we can re-concatenate the styling value in the desired priority.
 *
 * The insertion can happen either at the:
 * - end of template as in the case of coming across additional styling instruction in the template
 * - in front of the template in the case of coming across additional instruction in the
 *   `hostBindings`.
 *
 * We use `TStylingRange` to store the previous and next index into the `TData` where the template
 * bindings can be found.
 *
 * - bit 0 is used to mark that the previous index has a duplicate for current value.
 * - bit 1 is used to mark that the next index has a duplicate for the current value.
 * - bits 2-16 are used to encode the next/tail of the template.
 * - bits 17-32 are used to encode the previous/head of template.
 *
 * NODE: *duplicate* false implies that it is statically known that this binding will not collide
 * with other bindings and therefore there is no need to check other bindings. For example the
 * bindings in `<div [style.color]="exp" [style.width]="exp">` will never collide and will have
 * their bits set accordingly. Previous duplicate means that we may need to check previous if the
 * current binding is `null`. Next duplicate means that we may need to check next bindings if the
 * current binding is not `null`.
 *
 * NOTE: `0` has special significance and represents `null` as in no additional pointer.
 */
declare type TStylingRange = number & {
    __brand__: 'TStylingRange';
};

/**
 * Store the static values for the styling binding.
 *
 * The `TStylingStatic` is just `KeyValueArray` where key `""` (stored at location 0) contains the
 * `TStylingKey` (stored at location 1). In other words this wraps the `TStylingKey` such that the
 * `""` contains the wrapped value.
 *
 * When instructions are resolving styling they may need to look forward or backwards in the linked
 * list to resolve the value. For this reason we have to make sure that he linked list also contains
 * the static values. However the list only has space for one item per styling instruction. For this
 * reason we store the static values here as part of the `TStylingKey`. This means that the
 * resolution function when looking for a value needs to first look at the binding value, and than
 * at `TStylingKey` (if it exists).
 *
 * Imagine we have:
 *
 * ```angular-ts
 * <div class="TEMPLATE" my-dir>
 *
 * @Directive({
 *   host: {
 *     class: 'DIR',
 *     '[class.dynamic]': 'exp' // ɵɵclassProp('dynamic', ctx.exp);
 *   }
 * })
 * ```
 *
 * In the above case the linked list will contain one item:
 *
 * ```ts
 *   // assume binding location: 10 for `ɵɵclassProp('dynamic', ctx.exp);`
 *   tData[10] = <TStylingStatic>[
 *     '': 'dynamic', // This is the wrapped value of `TStylingKey`
 *     'DIR': true,   // This is the default static value of directive binding.
 *   ];
 *   tData[10 + 1] = 0; // We don't have prev/next.
 *
 *   lView[10] = undefined;     // assume `ctx.exp` is `undefined`
 *   lView[10 + 1] = undefined; // Just normalized `lView[10]`
 * ```
 *
 * So when the function is resolving styling value, it first needs to look into the linked list
 * (there is none) and than into the static `TStylingStatic` too see if there is a default value for
 * `dynamic` (there is not). Therefore it is safe to remove it.
 *
 * If setting `true` case:
 * ```ts
 *   lView[10] = true;     // assume `ctx.exp` is `true`
 *   lView[10 + 1] = true; // Just normalized `lView[10]`
 * ```
 * So when the function is resolving styling value, it first needs to look into the linked list
 * (there is none) and than into `TNode.residualClass` (TNode.residualStyle) which contains
 * ```ts
 *   tNode.residualClass = [
 *     'TEMPLATE': true,
 *   ];
 * ```
 *
 * This means that it is safe to add class.
 */
declare interface TStylingStatic extends KeyValueArray<any> {
}

/** Static data for a text node */
declare interface TTextNode extends TNode {
    /** Index in the data[] array */
    index: number;
    child: null;
    /**
     * Text nodes will have parents unless they are the first node of a component or
     * embedded view (which means their parent is in a different view and must be
     * retrieved using LView.node).
     */
    parent: TElementNode | TElementContainerNode | null;
    tView: null;
    projection: null;
}

declare const TVIEW = 1;

/**
 * The static data for an LView (shared between all templates of a
 * given type).
 *
 * Stored on the `ComponentDef.tView`.
 */
declare interface TView {
    /**
     * Type of `TView` (`Root`|`Component`|`Embedded`).
     */
    type: TViewType;
    /**
     * This is a blueprint used to generate LView instances for this TView. Copying this
     * blueprint is faster than creating a new LView from scratch.
     */
    blueprint: LView;
    /**
     * The template function used to refresh the view of dynamically created views
     * and components. Will be null for inline views.
     */
    template: ComponentTemplate<{}> | null;
    /**
     * A function containing query-related instructions.
     */
    viewQuery: ViewQueriesFunction<{}> | null;
    /**
     * A `TNode` representing the declaration location of this `TView` (not part of this TView).
     */
    declTNode: TNode | null;
    /** Whether or not this template has been processed in creation mode. */
    firstCreatePass: boolean;
    /**
     *  Whether or not this template has been processed in update mode (e.g. change detected)
     *
     * `firstUpdatePass` is used by styling to set up `TData` to contain metadata about the styling
     * instructions. (Mainly to build up a linked list of styling priority order.)
     *
     * Typically this function gets cleared after first execution. If exception is thrown then this
     * flag can remain turned un until there is first successful (no exception) pass. This means that
     * individual styling instructions keep track of if they have already been added to the linked
     * list to prevent double adding.
     */
    firstUpdatePass: boolean;
    /** Static data equivalent of LView.data[]. Contains TNodes, PipeDefInternal or TI18n. */
    data: TData;
    /**
     * The binding start index is the index at which the data array
     * starts to store bindings only. Saving this value ensures that we
     * will begin reading bindings at the correct point in the array when
     * we are in update mode.
     *
     * -1 means that it has not been initialized.
     */
    bindingStartIndex: number;
    /**
     * The index where the "expando" section of `LView` begins. The expando
     * section contains injectors, directive instances, and host binding values.
     * Unlike the "decls" and "vars" sections of `LView`, the length of this
     * section cannot be calculated at compile-time because directives are matched
     * at runtime to preserve locality.
     *
     * We store this start index so we know where to start checking host bindings
     * in `setHostBindings`.
     */
    expandoStartIndex: number;
    /**
     * Whether or not there are any static view queries tracked on this view.
     *
     * We store this so we know whether or not we should do a view query
     * refresh after creation mode to collect static query results.
     */
    staticViewQueries: boolean;
    /**
     * Whether or not there are any static content queries tracked on this view.
     *
     * We store this so we know whether or not we should do a content query
     * refresh after creation mode to collect static query results.
     */
    staticContentQueries: boolean;
    /**
     * A reference to the first child node located in the view.
     */
    firstChild: TNode | null;
    /**
     * Stores the OpCodes to be replayed during change-detection to process the `HostBindings`
     *
     * See `HostBindingOpCodes` for encoding details.
     */
    hostBindingOpCodes: HostBindingOpCodes | null;
    /**
     * Full registry of directives and components that may be found in this view.
     *
     * It's necessary to keep a copy of the full def list on the TView so it's possible
     * to render template functions without a host component.
     */
    directiveRegistry: DirectiveDefList | null;
    /**
     * Full registry of pipes that may be found in this view.
     *
     * The property is either an array of `PipeDefs`s or a function which returns the array of
     * `PipeDefs`s. The function is necessary to be able to support forward declarations.
     *
     * It's necessary to keep a copy of the full def list on the TView so it's possible
     * to render template functions without a host component.
     */
    pipeRegistry: PipeDefList | null;
    /**
     * Array of ngOnInit, ngOnChanges and ngDoCheck hooks that should be executed for this view in
     * creation mode.
     *
     * This array has a flat structure and contains TNode indices, directive indices (where an
     * instance can be found in `LView`) and hook functions. TNode index is followed by the directive
     * index and a hook function. If there are multiple hooks for a given TNode, the TNode index is
     * not repeated and the next lifecycle hook information is stored right after the previous hook
     * function. This is done so that at runtime the system can efficiently iterate over all of the
     * functions to invoke without having to make any decisions/lookups.
     */
    preOrderHooks: HookData | null;
    /**
     * Array of ngOnChanges and ngDoCheck hooks that should be executed for this view in update mode.
     *
     * This array has the same structure as the `preOrderHooks` one.
     */
    preOrderCheckHooks: HookData | null;
    /**
     * Array of ngAfterContentInit and ngAfterContentChecked hooks that should be executed
     * for this view in creation mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    contentHooks: HookData | null;
    /**
     * Array of ngAfterContentChecked hooks that should be executed for this view in update
     * mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    contentCheckHooks: HookData | null;
    /**
     * Array of ngAfterViewInit and ngAfterViewChecked hooks that should be executed for
     * this view in creation mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    viewHooks: HookData | null;
    /**
     * Array of ngAfterViewChecked hooks that should be executed for this view in
     * update mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    viewCheckHooks: HookData | null;
    /**
     * Array of ngOnDestroy hooks that should be executed when this view is destroyed.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    destroyHooks: DestroyHookData | null;
    /**
     * When a view is destroyed, listeners need to be released and outputs need to be
     * unsubscribed. This cleanup array stores both listener data (in chunks of 4)
     * and output data (in chunks of 2) for a particular view. Combining the arrays
     * saves on memory (70 bytes per array) and on a few bytes of code size (for two
     * separate for loops).
     *
     * If it's a native DOM listener or output subscription being stored:
     * 1st index is: event name  `name = tView.cleanup[i+0]`
     * 2nd index is: index of native element or a function that retrieves global target (window,
     *               document or body) reference based on the native element:
     *    `typeof idxOrTargetGetter === 'function'`: global target getter function
     *    `typeof idxOrTargetGetter === 'number'`: index of native element
     *
     * 3rd index is: index of listener function `listener = lView[CLEANUP][tView.cleanup[i+2]]`
     * 4th index is: `useCaptureOrIndx = tView.cleanup[i+3]`
     *    `typeof useCaptureOrIndx == 'boolean' : useCapture boolean
     *    `typeof useCaptureOrIndx == 'number':
     *         `useCaptureOrIndx >= 0` `removeListener = LView[CLEANUP][useCaptureOrIndx]`
     *         `useCaptureOrIndx <  0` `subscription = LView[CLEANUP][-useCaptureOrIndx]`
     *
     * If it's an output subscription or query list destroy hook:
     * 1st index is: output unsubscribe function / query list destroy function
     * 2nd index is: index of function context in LView.cleanupInstances[]
     *               `tView.cleanup[i+0].call(lView[CLEANUP][tView.cleanup[i+1]])`
     */
    cleanup: any[] | null;
    /**
     * A list of element indices for child components that will need to be
     * refreshed when the current view has finished its check. These indices have
     * already been adjusted for the HEADER_OFFSET.
     *
     */
    components: number[] | null;
    /**
     * A collection of queries tracked in a given view.
     */
    queries: TQueries | null;
    /**
     * An array of indices pointing to directives with content queries alongside with the
     * corresponding query index. Each entry in this array is a tuple of:
     * - index of the first content query index declared by a given directive;
     * - index of a directive.
     *
     * We are storing those indexes so we can refresh content queries as part of a view refresh
     * process.
     */
    contentQueries: number[] | null;
    /**
     * Set of schemas that declare elements to be allowed inside the view.
     */
    schemas: SchemaMetadata[] | null;
    /**
     * Array of constants for the view. Includes attribute arrays, local definition arrays etc.
     * Used for directive matching, attribute bindings, local definitions and more.
     */
    consts: TConstants | null;
    /**
     * Indicates that there was an error before we managed to complete the first create pass of the
     * view. This means that the view is likely corrupted and we should try to recover it.
     */
    incompleteFirstPass: boolean;
    /**
     * Unique id of this TView for hydration purposes:
     * - TViewType.Embedded: a unique id generated during serialization on the server
     * - TViewType.Component: an id generated based on component properties
     *                        (see `getComponentId` function for details)
     */
    ssrId: string | null;
}

/**
 * Explicitly marks `TView` as a specific type in `ngDevMode`
 *
 * It is useful to know conceptually what time of `TView` we are dealing with when
 * debugging an application (even if the runtime does not need it.) For this reason
 * we store this information in the `ngDevMode` `TView` and than use it for
 * better debugging experience.
 */
declare const enum TViewType {
    /**
     * Root `TView` is the used to bootstrap components into. It is used in conjunction with
     * `LView` which takes an existing DOM node not owned by Angular and wraps it in `TView`/`LView`
     * so that other components can be loaded into it.
     */
    Root = 0,
    /**
     * `TView` associated with a Component. This would be the `TView` directly associated with the
     * component view (as opposed an `Embedded` `TView` which would be a child of `Component` `TView`)
     */
    Component = 1,
    /**
     * `TView` associated with a template. Such as `*ngIf`, `<ng-template>` etc... A `Component`
     * can have zero or more `Embedded` `TView`s.
     */
    Embedded = 2
}

/**
 * Special location which allows easy identification of type. If we have an array which was
 * retrieved from the `LView` and that array has `true` at `TYPE` location, we know it is
 * `LContainer`.
 */
declare const TYPE = 1;

/**
 * @description
 *
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is represented by
 * the `MyCustomComponent` constructor function.
 *
 * @publicApi
 */
export declare const Type: FunctionConstructor;

export declare interface Type<T> extends Function {
    new (...args: any[]): T;
}

declare type Type_2 = Function;

/**
 * An interface implemented by all Angular type decorators, which allows them to be used as
 * decorators as well as Angular syntax.
 *
 * ```ts
 * @ng.Component({...})
 * class MyClass {...}
 * ```
 *
 * @publicApi
 */
export declare interface TypeDecorator {
    /**
     * Invoke as decorator.
     */
    <T extends Type<any>>(type: T): T;
    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
    (target: unknown, context: unknown): void;
}

declare type TypeOrFactory<T> = T | (() => T);

/**
 * Configures the `Injector` to return an instance of `Type` when `Type' is used as the token.
 *
 * Create an instance by invoking the `new` operator and supplying additional arguments.
 * This form is a short form of `TypeProvider`;
 *
 * For more details, see the ["Dependency Injection Guide"](guide/di/dependency-injection.
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='TypeProvider'}
 *
 * @publicApi
 */
export declare interface TypeProvider extends Type<any> {
}


/**
 * Execute an arbitrary function in a non-reactive (non-tracking) context. The executed function
 * can, optionally, return a value.
 */
export declare function untracked<T>(nonReactiveReadsFn: () => T): T;

/**
 * A comparison function which can determine if two values are equal.
 */
export declare type ValueEqualityFn<T> = (a: T, b: T) => boolean;

/**
 * Configures the `Injector` to return a value for a token.
 * @see [Dependency Injection Guide](guide/di/dependency-injection.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='ValueProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface ValueProvider extends ValueSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value for a token.
 * Base for `ValueProvider` decorator.
 *
 * @publicApi
 */
export declare interface ValueSansProvider {
    /**
     * The value to inject.
     */
    useValue: any;
}

/**
 * @publicApi
 */
export declare const VERSION: Version;


/**
 * @description Represents the version of Angular
 *
 * @publicApi
 */
export declare class Version {
    full: string;
    readonly major: string;
    readonly minor: string;
    readonly patch: string;
    constructor(full: string);
}

declare const VIEW_REFS = 8;

/**
 * Type of the ViewChild metadata.
 *
 * @publicApi
 */
export declare type ViewChild = Query;

/**
 * ViewChild decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const ViewChild: ViewChildDecorator;

/**
 * Initializes a view child query.
 *
 * Consider using `viewChild.required` for queries that should always match.
 *
 * @usageNotes
 * Create a child query in your component by declaring a
 * class field and initializing it with the `viewChild()` function.
 *
 * ```angular-ts
 * @Component({template: '<div #el></div><my-component #cmp />'})
 * export class TestComponent {
 *   divEl = viewChild<ElementRef>('el');                   // Signal<ElementRef|undefined>
 *   divElRequired = viewChild.required<ElementRef>('el');  // Signal<ElementRef>
 *   cmp = viewChild(MyComponent);                          // Signal<MyComponent|undefined>
 *   cmpRequired = viewChild.required(MyComponent);         // Signal<MyComponent>
 * }
 * ```
 *
 * @publicAPI
 * @initializerApiFunction
 */
export declare const viewChild: ViewChildFunction;

/**
 * Type of the ViewChild decorator / constructor function.
 *
 * @see {@link ViewChild}
 * @publicApi
 */
export declare interface ViewChildDecorator {
    /**
     * @description
     * Property decorator that configures a view query.
     * The change detector looks for the first element or the directive matching the selector
     * in the view DOM. If the view DOM changes, and a new child matches the selector,
     * the property is updated.
     *
     * **Metadata Properties**:
     *
     * * **selector** - The directive type or the name used for querying.
     * * **read** - Used to read a different token from the queried elements.
     * * **static** - `true` to resolve query results before change detection runs,
     * `false` to resolve after change detection. Defaults to `false`.
     *
     *
     * The following selectors are supported.
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * A template reference variable as a string (e.g. query `<my-component #cmp></my-component>`
     * with `@ViewChild('cmp')`)
     *   * Any provider defined in the child component tree of the current component (e.g.
     * `@ViewChild(SomeService) someService: SomeService`)
     *   * Any provider defined through a string token (e.g. `@ViewChild('someToken') someTokenVal:
     * any`)
     *   * A `TemplateRef` (e.g. query `<ng-template></ng-template>` with `@ViewChild(TemplateRef)
     * template;`)
     *
     * The following values are supported by `read`:
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * Any provider defined on the injector of the component that is matched by the `selector` of
     * this query
     *   * Any provider defined through a string token (e.g. `{provide: 'token', useValue: 'val'}`)
     *   * `TemplateRef`, `ElementRef`, and `ViewContainerRef`
     *
     * Difference between dynamic and static queries:
     *   * Dynamic queries \(`static: false`\) - The query resolves before the `ngAfterViewInit()`
     * callback is called. The result will be updated for changes to your view, such as changes to
     * `ngIf` and `ngFor` blocks.
     *   * Static queries \(`static: true`\) - The query resolves once
     * the view has been created, but before change detection runs (before the `ngOnInit()` callback
     * is called). The result, though, will never be updated to reflect changes to your view, such as
     * changes to `ngIf` and `ngFor` blocks.
     *
     * @usageNotes
     *
     * ### Example 1
     *
     * {@example core/di/ts/viewChild/view_child_example.ts region='Component'}
     *
     * ### Example 2
     *
     * {@example core/di/ts/viewChild/view_child_howto.ts region='HowTo'}
     *
     * @Annotation
     */
    (selector: ProviderToken<unknown> | Function | string, opts?: {
        read?: any;
        static?: boolean;
    }): any;
    new (selector: ProviderToken<unknown> | Function | string, opts?: {
        read?: any;
        static?: boolean;
    }): ViewChild;
}

/**
 * Type of the `viewChild` function. The viewChild function creates a singular view query.
 *
 * It is a special function that also provides access to required query results via the `.required`
 * property.
 *
 * @publicAPI
 * @docsPrivate Ignored because `viewChild` is the canonical API entry.
 */
export declare interface ViewChildFunction {
    /**
     * Initializes a view child query. Consider using `viewChild.required` for queries that should
     * always match.
     *
     * @publicAPI
     */
    <LocatorT, ReadT>(locator: ProviderToken<LocatorT> | string, opts: {
        read: ProviderToken<ReadT>;
        debugName?: string;
    }): Signal<ReadT | undefined>;
    <LocatorT>(locator: ProviderToken<LocatorT> | string, opts?: {
        debugName?: string;
    }): Signal<LocatorT | undefined>;
    /**
     * Initializes a view child query that is expected to always match an element.
     *
     * @publicAPI
     */
    required: {
        <LocatorT>(locator: ProviderToken<LocatorT> | string, opts?: {
            debugName?: string;
        }): Signal<LocatorT>;
        <LocatorT, ReadT>(locator: ProviderToken<LocatorT> | string, opts: {
            read: ProviderToken<ReadT>;
            debugName?: string;
        }): Signal<ReadT>;
    };
}

/**
 * Type of the ViewChildren metadata.
 *
 * @publicApi
 */
export declare type ViewChildren = Query;

/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const ViewChildren: ViewChildrenDecorator;

export declare function viewChildren<LocatorT>(locator: ProviderToken<LocatorT> | string, opts?: {
    debugName?: string;
}): Signal<ReadonlyArray<LocatorT>>;

export declare function viewChildren<LocatorT, ReadT>(locator: ProviderToken<LocatorT> | string, opts: {
    read: ProviderToken<ReadT>;
    debugName?: string;
}): Signal<ReadonlyArray<ReadT>>;

/**
 * Type of the ViewChildren decorator / constructor function.
 *
 * @see {@link ViewChildren}
 *
 * @publicApi
 */
export declare interface ViewChildrenDecorator {
    /**
     * @description
     * Property decorator that configures a view query.
     *
     * Use to get the `QueryList` of elements or directives from the view DOM.
     * Any time a child element is added, removed, or moved, the query list will be updated,
     * and the changes observable of the query list will emit a new value.
     *
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - The directive type or the name used for querying.
     * * **read** - Used to read a different token from the queried elements.
     * * **emitDistinctChangesOnly** - The ` QueryList#changes` observable will emit new values only
     *   if the QueryList result has changed. When `false` the `changes` observable might emit even
     *   if the QueryList has not changed.
     *   ** Note: *** This config option is **deprecated**, it will be permanently set to `true` and
     * removed in future versions of Angular.
     *
     * The following selectors are supported.
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * A template reference variable as a string (e.g. query `<my-component #cmp></my-component>`
     * with `@ViewChildren('cmp')`)
     *   * Any provider defined in the child component tree of the current component (e.g.
     * `@ViewChildren(SomeService) someService!: SomeService`)
     *   * Any provider defined through a string token (e.g. `@ViewChildren('someToken')
     * someTokenVal!: any`)
     *   * A `TemplateRef` (e.g. query `<ng-template></ng-template>` with `@ViewChildren(TemplateRef)
     * template;`)
     *
     * In addition, multiple string selectors can be separated with a comma (e.g.
     * `@ViewChildren('cmp1,cmp2')`)
     *
     * The following values are supported by `read`:
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * Any provider defined on the injector of the component that is matched by the `selector` of
     * this query
     *   * Any provider defined through a string token (e.g. `{provide: 'token', useValue: 'val'}`)
     *   * `TemplateRef`, `ElementRef`, and `ViewContainerRef`
     *
     * @usageNotes
     *
     * {@example core/di/ts/viewChildren/view_children_howto.ts region='HowTo'}
     *
     * ### Another example
     *
     * {@example core/di/ts/viewChildren/view_children_example.ts region='Component'}
     *
     * @Annotation
     */
    (selector: ProviderToken<unknown> | Function | string, opts?: {
        read?: any;
        emitDistinctChangesOnly?: boolean;
    }): any;
    new (selector: ProviderToken<unknown> | Function | string, opts?: {
        read?: any;
        emitDistinctChangesOnly?: boolean;
    }): ViewChildren;
}

/**
 * Represents a container where one or more views can be attached to a component.
 *
 * Can contain *host views* (created by instantiating a
 * component with the `createComponent()` method), and *embedded views*
 * (created by instantiating a `TemplateRef` with the `createEmbeddedView()` method).
 *
 * A view container instance can contain other view containers,
 * creating a view hierarchy.
 *
 * @usageNotes
 *
 * The example below demonstrates how the `createComponent` function can be used
 * to create an instance of a ComponentRef dynamically and attach it to an ApplicationRef,
 * so that it gets included into change detection cycles.
 *
 * Note: the example uses standalone components, but the function can also be used for
 * non-standalone components (declared in an NgModule) as well.
 *
 * ```angular-ts
 * @Component({
 *   standalone: true,
 *   selector: 'dynamic',
 *   template: `<span>This is a content of a dynamic component.</span>`,
 * })
 * class DynamicComponent {
 *   vcr = inject(ViewContainerRef);
 * }
 *
 * @Component({
 *   standalone: true,
 *   selector: 'app',
 *   template: `<main>Hi! This is the main content.</main>`,
 * })
 * class AppComponent {
 *   vcr = inject(ViewContainerRef);
 *
 *   ngAfterViewInit() {
 *     const compRef = this.vcr.createComponent(DynamicComponent);
 *     compRef.changeDetectorRef.detectChanges();
 *   }
 * }
 * ```
 *
 * @see {@link ComponentRef}
 * @see {@link EmbeddedViewRef}
 *
 * @publicApi
 */
export declare abstract class ViewContainerRef {
    /**
     * Anchor element that specifies the location of this container in the containing view.
     * Each view container can have only one anchor element, and each anchor element
     * can have only a single view container.
     *
     * Root elements of views attached to this container become siblings of the anchor element in
     * the rendered view.
     *
     * Access the `ViewContainerRef` of an element by placing a `Directive` injected
     * with `ViewContainerRef` on the element, or use a `ViewChild` query.
     *
     * <!-- TODO: rename to anchorElement -->
     */
    abstract get element(): ElementRef;
    /**
     * The dependency injector for this view container.
     */
    abstract get injector(): Injector;
    /** @deprecated No replacement */
    abstract get parentInjector(): Injector;
    /**
     * Destroys all views in this container.
     */
    abstract clear(): void;
    /**
     * Retrieves a view from this container.
     * @param index The 0-based index of the view to retrieve.
     * @returns The `ViewRef` instance, or null if the index is out of range.
     */
    abstract get(index: number): ViewRef | null;
    /**
     * Reports how many views are currently attached to this container.
     * @returns The number of views.
     */
    abstract get length(): number;
    /**
     * Instantiates an embedded view and inserts it
     * into this container.
     * @param templateRef The HTML template that defines the view.
     * @param context The data-binding context of the embedded view, as declared
     * in the `<ng-template>` usage.
     * @param options Extra configuration for the created view. Includes:
     *  * index: The 0-based index at which to insert the new view into this container.
     *           If not specified, appends the new view as the last entry.
     *  * injector: Injector to be used within the embedded view.
     *
     * @returns The `ViewRef` instance for the newly created view.
     */
    abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, options?: {
        index?: number;
        injector?: Injector;
    }): EmbeddedViewRef<C>;
    /**
     * Instantiates an embedded view and inserts it
     * into this container.
     * @param templateRef The HTML template that defines the view.
     * @param context The data-binding context of the embedded view, as declared
     * in the `<ng-template>` usage.
     * @param index The 0-based index at which to insert the new view into this container.
     * If not specified, appends the new view as the last entry.
     *
     * @returns The `ViewRef` instance for the newly created view.
     */
    abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
    /**
     * Instantiates a single component and inserts its host view into this container.
     *
     * @param componentType Component Type to use.
     * @param options An object that contains extra parameters:
     *  * index: the index at which to insert the new component's host view into this container.
     *           If not specified, appends the new view as the last entry.
     *  * injector: the injector to use as the parent for the new component.
     *  * ngModuleRef: an NgModuleRef of the component's NgModule, you should almost always provide
     *                 this to ensure that all expected providers are available for the component
     *                 instantiation.
     *  * environmentInjector: an EnvironmentInjector which will provide the component's environment.
     *                 you should almost always provide this to ensure that all expected providers
     *                 are available for the component instantiation. This option is intended to
     *                 replace the `ngModuleRef` parameter.
     *  * projectableNodes: list of DOM nodes that should be projected through
     *                      [`<ng-content>`](api/core/ng-content) of the new component instance.
     *
     * @returns The new `ComponentRef` which contains the component instance and the host view.
     */
    abstract createComponent<C>(componentType: Type<C>, options?: {
        index?: number;
        injector?: Injector;
        ngModuleRef?: NgModuleRef<unknown>;
        environmentInjector?: EnvironmentInjector | NgModuleRef<unknown>;
        projectableNodes?: Node[][];
    }): ComponentRef<C>;
    /**
     * Instantiates a single component and inserts its host view into this container.
     *
     * @param componentFactory Component factory to use.
     * @param index The index at which to insert the new component's host view into this container.
     * If not specified, appends the new view as the last entry.
     * @param injector The injector to use as the parent for the new component.
     * @param projectableNodes List of DOM nodes that should be projected through
     *     [`<ng-content>`](api/core/ng-content) of the new component instance.
     * @param ngModuleRef An instance of the NgModuleRef that represent an NgModule.
     * This information is used to retrieve corresponding NgModule injector.
     *
     * @returns The new `ComponentRef` which contains the component instance and the host view.
     *
     * @deprecated Angular no longer requires component factories to dynamically create components.
     *     Use different signature of the `createComponent` method, which allows passing
     *     Component class directly.
     */
    abstract createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], environmentInjector?: EnvironmentInjector | NgModuleRef<any>): ComponentRef<C>;
    /**
     * Inserts a view into this container.
     * @param viewRef The view to insert.
     * @param index The 0-based index at which to insert the view.
     * If not specified, appends the new view as the last entry.
     * @returns The inserted `ViewRef` instance.
     *
     */
    abstract insert(viewRef: ViewRef, index?: number): ViewRef;
    /**
     * Moves a view to a new location in this container.
     * @param viewRef The view to move.
     * @param index The 0-based index of the new location.
     * @returns The moved `ViewRef` instance.
     */
    abstract move(viewRef: ViewRef, currentIndex: number): ViewRef;
    /**
     * Returns the index of a view within the current container.
     * @param viewRef The view to query.
     * @returns The 0-based index of the view's position in this container,
     * or `-1` if this container doesn't contain the view.
     */
    abstract indexOf(viewRef: ViewRef): number;
    /**
     * Destroys a view attached to this container
     * @param index The 0-based index of the view to destroy.
     * If not specified, the last view in the container is removed.
     */
    abstract remove(index?: number): void;
    /**
     * Detaches a view from this container without destroying it.
     * Use along with `insert()` to move a view within the current container.
     * @param index The 0-based index of the view to detach.
     * If not specified, the last view in the container is detached.
     */
    abstract detach(index?: number): ViewRef | null;
}

declare interface ViewEffectNode extends EffectNode {
    view: LView;
}


/**
 * Defines the CSS styles encapsulation policies for the {@link Component} decorator's
 * `encapsulation` option.
 *
 * See {@link Component#encapsulation encapsulation}.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/ts/metadata/encapsulation.ts region='longform'}
 *
 * @publicApi
 */
export declare enum ViewEncapsulation {
    /**
     * Emulates a native Shadow DOM encapsulation behavior by adding a specific attribute to the
     * component's host element and applying the same attribute to all the CSS selectors provided
     * via {@link Component#styles styles} or {@link Component#styleUrls styleUrls}.
     *
     * This is the default option.
     */
    Emulated = 0,
    /**
     * Doesn't provide any sort of CSS style encapsulation, meaning that all the styles provided
     * via {@link Component#styles styles} or {@link Component#styleUrls styleUrls} are applicable
     * to any HTML element of the application regardless of their host Component.
     */
    None = 2,
    /**
     * Uses the browser's native Shadow DOM API to encapsulate CSS styles, meaning that it creates
     * a ShadowRoot for the component's host element which is then used to encapsulate
     * all the Component's styling.
     */
    ShadowDom = 3
}

declare enum ViewEncapsulation_2 {
    Emulated = 0,
    None = 2,
    ShadowDom = 3
}

/**
 * Definition of what a view queries function should look like.
 */
declare type ViewQueriesFunction<T> = <U extends T>(rf: ɵRenderFlags, ctx: U) => void;

/**
 * Represents an Angular view.
 *
 * @see [Change detection usage](/api/core/ChangeDetectorRef?tab=usage-notes)
 *
 * @publicApi
 */
export declare abstract class ViewRef extends ChangeDetectorRef {
    /**
     * Destroys this view and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Reports whether this view has been destroyed.
     * @returns True after the `destroy()` method has been called, false otherwise.
     */
    abstract get destroyed(): boolean;
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for views.
     * @param callback A handler function that cleans up developer-defined data
     * associated with a view. Called when the `destroy()` method is invoked.
     */
    abstract onDestroy(callback: Function): void;
}

declare type WrappedRequest = {
    request: unknown;
    reload: number;
};

/**
 * A `Resource` with a mutable value.
 *
 * Overwriting the value of a resource sets it to the 'local' state.
 *
 * @experimental
 */
export declare interface WritableResource<T> extends Resource<T> {
    readonly value: WritableSignal<T>;
    hasValue(): this is WritableResource<Exclude<T, undefined>>;
    /**
     * Convenience wrapper for `value.set`.
     */
    set(value: T): void;
    /**
     * Convenience wrapper for `value.update`.
     */
    update(updater: (value: T) => T): void;
    asReadonly(): Resource<T>;
}

/**
 * A `Signal` with a value that can be mutated via a setter interface.
 */
export declare interface WritableSignal<T> extends Signal<T> {
    [ɵWRITABLE_SIGNAL]: T;
    /**
     * Directly set the signal to a new value, and notify any dependents.
     */
    set(value: T): void;
    /**
     * Update the value of the signal based on its current value, and
     * notify any dependents.
     */
    update(updateFn: (value: T) => T): void;
    /**
     * Returns a readonly version of this signal. Readonly signals can be accessed to read their value
     * but can't be changed using set or update methods. The readonly signals do _not_ have
     * any built-in mechanism that would prevent deep-mutation of their value.
     */
    asReadonly(): Signal<T>;
}

/**
 * A wrapper around `ZoneAwareQueueingScheduler` that schedules flushing via the microtask queue
 * when.
 */
declare class ZoneAwareEffectScheduler implements ɵEffectScheduler {
    private queuedEffectCount;
    private queues;
    schedule(handle: SchedulableEffect): void;
    remove(handle: SchedulableEffect): void;
    private enqueue;
    /**
     * Run all scheduled effects.
     *
     * Execution order of effects within the same zone is guaranteed to be FIFO, but there is no
     * ordering guarantee between effects scheduled in different zones.
     */
    flush(): void;
    private flushQueue;
}

/**
 * Sanitizes the given unsafe, untrusted HTML fragment, and returns HTML text that is safe to add to
 * the DOM in a browser environment.
 */
export declare function ɵ_sanitizeHtml(defaultDoc: any, unsafeHtmlInput: string): TrustedHTML | string;


export declare function ɵ_sanitizeUrl(url: string): string;

export declare class ɵAfterRenderManager {
    impl: AfterRenderImpl | null;
    execute(): void;
    /** @nocollapse */
    static ɵprov: unknown;
}

/**
 * Internal token to indicate whether having multiple bootstrapped platform should be allowed (only
 * one bootstrapped platform is allowed by default). This token helps to support SSR scenarios.
 */
export declare const ɵALLOW_MULTIPLE_PLATFORMS: InjectionToken<boolean>;

export declare function ɵallowSanitizationBypassAndThrow(value: any, type: ɵBypassType.Html): value is ɵSafeHtml;

export declare function ɵallowSanitizationBypassAndThrow(value: any, type: ɵBypassType.ResourceUrl): value is ɵSafeResourceUrl;

export declare function ɵallowSanitizationBypassAndThrow(value: any, type: ɵBypassType.Script): value is ɵSafeScript;

export declare function ɵallowSanitizationBypassAndThrow(value: any, type: ɵBypassType.Style): value is ɵSafeStyle;

export declare function ɵallowSanitizationBypassAndThrow(value: any, type: ɵBypassType.Url): value is ɵSafeUrl;

export declare function ɵallowSanitizationBypassAndThrow(value: any, type: ɵBypassType): boolean;

/**
 * This enum is meant to be used by `ɵtype` properties of the different renderers implemented
 * by the framework
 *
 * We choose to not add `ɵtype` to `Renderer2` to no expose it to the public API.
 */
export declare const enum ɵAnimationRendererType {
    Regular = 0,
    Delegated = 1
}

/**
 * Annotates all components bootstrapped in a given ApplicationRef
 * with info needed for hydration.
 *
 * @param appRef An instance of an ApplicationRef.
 * @param doc A reference to the current Document instance.
 * @return event types that need to be replayed
 */
export declare function ɵannotateForHydration(appRef: ApplicationRef, doc: Document): {
    regular: Set<string>;
    capture: Set<string>;
};


/**
 * A set of marker values to be used in the attributes arrays. These markers indicate that some
 * items are not regular attributes and the processing should be adapted accordingly.
 */
export declare const enum ɵAttributeMarker {
    /**
     * An implicit marker which indicates that the value in the array are of `attributeKey`,
     * `attributeValue` format.
     *
     * NOTE: This is implicit as it is the type when no marker is present in array. We indicate that
     * it should not be present at runtime by the negative number.
     */
    ImplicitAttributes = -1,
    /**
     * Marker indicates that the following 3 values in the attributes array are:
     * namespaceUri, attributeName, attributeValue
     * in that order.
     */
    NamespaceURI = 0,
    /**
     * Signals class declaration.
     *
     * Each value following `Classes` designates a class name to include on the element.
     * ## Example:
     *
     * Given:
     * ```html
     * <div class="foo bar baz">...</div>
     * ```
     *
     * the generated code is:
     * ```ts
     * var _c1 = [AttributeMarker.Classes, 'foo', 'bar', 'baz'];
     * ```
     */
    Classes = 1,
    /**
     * Signals style declaration.
     *
     * Each pair of values following `Styles` designates a style name and value to include on the
     * element.
     * ## Example:
     *
     * Given:
     * ```html
     * <div style="width:100px; height:200px; color:red">...</div>
     * ```
     *
     * the generated code is:
     * ```ts
     * var _c1 = [AttributeMarker.Styles, 'width', '100px', 'height'. '200px', 'color', 'red'];
     * ```
     */
    Styles = 2,
    /**
     * Signals that the following attribute names were extracted from input or output bindings.
     *
     * For example, given the following HTML:
     *
     * ```html
     * <div moo="car" [foo]="exp" (bar)="doSth()">
     * ```
     *
     * the generated code is:
     *
     * ```ts
     * var _c1 = ['moo', 'car', AttributeMarker.Bindings, 'foo', 'bar'];
     * ```
     */
    Bindings = 3,
    /**
     * Signals that the following attribute names were hoisted from an inline-template declaration.
     *
     * For example, given the following HTML:
     *
     * ```html
     * <div *ngFor="let value of values; trackBy:trackBy" dirA [dirB]="value">
     * ```
     *
     * the generated code for the `template()` instruction would include:
     *
     * ```
     * ['dirA', '', AttributeMarker.Bindings, 'dirB', AttributeMarker.Template, 'ngFor', 'ngForOf',
     * 'ngForTrackBy', 'let-value']
     * ```
     *
     * while the generated code for the `element()` instruction inside the template function would
     * include:
     *
     * ```
     * ['dirA', '', AttributeMarker.Bindings, 'dirB']
     * ```
     */
    Template = 4,
    /**
     * Signals that the following attribute is `ngProjectAs` and its value is a parsed
     * `CssSelector`.
     *
     * For example, given the following HTML:
     *
     * ```html
     * <h1 attr="value" ngProjectAs="[title]">
     * ```
     *
     * the generated code for the `element()` instruction would include:
     *
     * ```ts
     * ['attr', 'value', AttributeMarker.ProjectAs, ['', 'title', '']]
     * ```
     */
    ProjectAs = 5,
    /**
     * Signals that the following attribute will be translated by runtime i18n
     *
     * For example, given the following HTML:
     *
     * ```html
     * <div moo="car" foo="value" i18n-foo [bar]="binding" i18n-bar>
     * ```
     *
     * the generated code is:
     *
     * ```ts
     * var _c1 = ['moo', 'car', AttributeMarker.I18n, 'foo', 'bar'];
     * ```
     */
    I18n = 6
}

/**
 * Mark `html` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link htmlSanitizer} to be trusted implicitly.
 *
 * @param trustedHtml `html` string which needs to be implicitly trusted.
 * @returns a `html` which has been branded to be implicitly trusted.
 */
export declare function ɵbypassSanitizationTrustHtml(trustedHtml: string): ɵSafeHtml;

/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link resourceUrlSanitizer} to be trusted implicitly.
 *
 * @param trustedResourceUrl `url` string which needs to be implicitly trusted.
 * @returns a `url` which has been branded to be implicitly trusted.
 */
export declare function ɵbypassSanitizationTrustResourceUrl(trustedResourceUrl: string): ɵSafeResourceUrl;

/**
 * Mark `script` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link scriptSanitizer} to be trusted implicitly.
 *
 * @param trustedScript `script` string which needs to be implicitly trusted.
 * @returns a `script` which has been branded to be implicitly trusted.
 */
export declare function ɵbypassSanitizationTrustScript(trustedScript: string): ɵSafeScript;

/**
 * Mark `style` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link styleSanitizer} to be trusted implicitly.
 *
 * @param trustedStyle `style` string which needs to be implicitly trusted.
 * @returns a `style` hich has been branded to be implicitly trusted.
 */
export declare function ɵbypassSanitizationTrustStyle(trustedStyle: string): ɵSafeStyle;

/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link urlSanitizer} to be trusted implicitly.
 *
 * @param trustedUrl `url` string which needs to be implicitly trusted.
 * @returns a `url`  which has been branded to be implicitly trusted.
 */
export declare function ɵbypassSanitizationTrustUrl(trustedUrl: string): ɵSafeUrl;


export declare const enum ɵBypassType {
    Url = "URL",
    Html = "HTML",
    ResourceUrl = "ResourceURL",
    Script = "Script",
    Style = "Style"
}

/**
 * Injectable that is notified when an `LView` is made aware of changes to application state.
 */
export declare abstract class ɵChangeDetectionScheduler {
    abstract notify(source: ɵNotificationSource): void;
    abstract runningTick: boolean;
}

export declare class ɵChangeDetectionSchedulerImpl implements ɵChangeDetectionScheduler {
    private readonly appRef;
    private readonly taskService;
    private readonly ngZone;
    private readonly zonelessEnabled;
    private readonly tracing;
    private readonly disableScheduling;
    private readonly zoneIsDefined;
    private readonly schedulerTickApplyArgs;
    private readonly subscriptions;
    private readonly angularZoneId;
    private readonly scheduleInRootZone;
    private cancelScheduledCallback;
    private useMicrotaskScheduler;
    runningTick: boolean;
    pendingRenderTaskId: number | null;
    constructor();
    notify(source: ɵNotificationSource): void;
    private shouldScheduleTick;
    /**
     * Calls ApplicationRef._tick inside the `NgZone`.
     *
     * Calling `tick` directly runs change detection and cancels any change detection that had been
     * scheduled previously.
     *
     * @param shouldRefreshViews Passed directly to `ApplicationRef._tick` and skips straight to
     *     render hooks when `false`.
     */
    private tick;
    ngOnDestroy(): void;
    private cleanup;
    static ɵfac: i0.ɵɵFactoryDeclaration<ɵChangeDetectionSchedulerImpl, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ɵChangeDetectionSchedulerImpl>;
}

export declare function ɵclearResolutionOfComponentResourcesQueue(): Map<Type<any>, Component>;

/**
 * Compile an Angular component according to its decorator metadata, and patch the resulting
 * component def (ɵcmp) onto the component type.
 *
 * Compilation may be asynchronous (due to the need to resolve URLs for the component template or
 * other resources, for example). In the event that compilation is not immediate, `compileComponent`
 * will enqueue resource resolution into a global queue and will fail to return the `ɵcmp`
 * until the global queue has been resolved with a call to `resolveComponentResources`.
 */
export declare function ɵcompileComponent(type: Type<any>, metadata: Component): void;

/**
 * Compile an Angular directive according to its decorator metadata, and patch the resulting
 * directive def onto the component type.
 *
 * In the event that compilation is not immediate, `compileDirective` will return a `Promise` which
 * will resolve when compilation completes and the directive becomes usable.
 */
export declare function ɵcompileDirective(type: Type<any>, directive: Directive | null): void;

/**
 * Compiles a module in JIT mode.
 *
 * This function automatically gets called when a class has a `@NgModule` decorator.
 */
export declare function ɵcompileNgModule(moduleType: Type<any>, ngModule?: NgModule): void;

/**
 * Compiles and adds the `ɵmod`, `ɵfac` and `ɵinj` properties to the module class.
 *
 * It's possible to compile a module via this API which will allow duplicate declarations in its
 * root.
 */
export declare function ɵcompileNgModuleDefs(moduleType: ɵNgModuleType, ngModule: NgModule, allowDuplicateDeclarationsInRoot?: boolean): void;

export declare function ɵcompileNgModuleFactory<M>(injector: Injector, options: CompilerOptions, moduleType: Type<M>): Promise<NgModuleFactory<M>>;

export declare function ɵcompilePipe(type: Type<any>, meta: Pipe): void;

/**
 * Partial metadata for a given component instance.
 * This information might be useful for debugging purposes or tooling.
 * Currently the following fields are available:
 *  - inputs
 *  - outputs
 *  - encapsulation
 *  - changeDetection
 *
 * @publicApi
 */
export declare interface ɵComponentDebugMetadata extends DirectiveDebugMetadata {
    encapsulation: ViewEncapsulation;
    changeDetection: ChangeDetectionStrategy;
}

/**
 * Runtime link information for Components.
 *
 * This is an internal data structure used by the render to link
 * components into templates.
 *
 * NOTE: Always use `defineComponent` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * See: {@link defineComponent}
 */
export declare interface ɵComponentDef<T> extends ɵDirectiveDef<T> {
    /**
     * Unique ID for the component. Used in view encapsulation and
     * to keep track of the injector in standalone components.
     */
    readonly id: string;
    /**
     * The View template of the component.
     */
    readonly template: ComponentTemplate<T>;
    /** Constants associated with the component's view. */
    readonly consts: TConstantsOrFactory | null;
    /**
     * An array of `ngContent[selector]` values that were found in the template.
     */
    readonly ngContentSelectors?: string[];
    /**
     * A set of styles that the component needs to be present for component to render correctly.
     */
    readonly styles: string[];
    /**
     * The number of nodes, local refs, and pipes in this component template.
     *
     * Used to calculate the length of the component's LView array, so we
     * can pre-fill the array and set the binding start index.
     */
    readonly decls: number;
    /**
     * The number of bindings in this component template (including pure fn bindings).
     *
     * Used to calculate the length of the component's LView array, so we
     * can pre-fill the array and set the host binding start index.
     */
    readonly vars: number;
    /**
     * Query-related instructions for a component.
     */
    viewQuery: ViewQueriesFunction<T> | null;
    /**
     * The view encapsulation type, which determines how styles are applied to
     * DOM elements. One of
     * - `Emulated` (default): Emulate native scoping of styles.
     * - `Native`: Use the native encapsulation mechanism of the renderer.
     * - `ShadowDom`: Use modern [ShadowDOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     *   create a ShadowRoot for component's host element.
     * - `None`: Do not provide any template or style encapsulation.
     */
    readonly encapsulation: ViewEncapsulation;
    /**
     * Defines arbitrary developer-defined data to be stored on a renderer instance.
     * This is useful for renderers that delegate to other renderers.
     */
    readonly data: {
        [kind: string]: any;
        animation?: any[];
    };
    /** Whether or not this component's ChangeDetectionStrategy is OnPush */
    readonly onPush: boolean;
    /** Whether or not this component is signal-based. */
    readonly signals: boolean;
    /**
     * Registry of directives and components that may be found in this view.
     *
     * The property is either an array of `DirectiveDef`s or a function which returns the array of
     * `DirectiveDef`s. The function is necessary to be able to support forward declarations.
     */
    directiveDefs: DirectiveDefListOrFactory | null;
    /**
     * Registry of pipes that may be found in this view.
     *
     * The property is either an array of `PipeDefs`s or a function which returns the array of
     * `PipeDefs`s. The function is necessary to be able to support forward declarations.
     */
    pipeDefs: PipeDefListOrFactory | null;
    /**
     * Unfiltered list of all dependencies of a component, or `null` if none.
     */
    dependencies: TypeOrFactory<DependencyTypeList> | null;
    /**
     * The set of schemas that declare elements to be allowed in the component's template.
     */
    schemas: SchemaMetadata[] | null;
    /**
     * Ivy runtime uses this place to store the computed tView for the component. This gets filled on
     * the first run of component.
     */
    tView: TView | null;
    /**
     * A function used by the framework to create standalone injectors.
     */
    getStandaloneInjector: ((parentInjector: EnvironmentInjector) => EnvironmentInjector | null) | null;
    /**
     * A function added by the {@link ɵɵExternalStylesFeature} and used by the framework to create
     * the list of external runtime style URLs.
     */
    getExternalStyles: ((encapsulationId?: string) => string[]) | null;
    /**
     * Used to store the result of `noSideEffects` function so that it is not removed by closure
     * compiler. The property should never be read.
     */
    readonly _?: unknown;
}

/**
 * A subclass of `Type` which has a static `ɵcmp`:`ComponentDef` field making it
 * consumable for rendering.
 */
export declare interface ɵComponentType<T> extends Type<T> {
    ɵcmp: unknown;
}

export declare class ɵConsole {
    log(message: string): void;
    warn(message: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ɵConsole, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ɵConsole>;
}

/**
 * Size of LContainer's header. Represents the index after which all views in the
 * container will be inserted. We need to keep a record of current views so we know
 * which views are already in the DOM (and don't need to be re-added) and so we can
 * remove views from the DOM when they are no longer required.
 */
export declare const ɵCONTAINER_HEADER_OFFSET = 10;

export declare function ɵconvertToBitFlags(flags: InjectOptions | InjectFlags | undefined): InjectFlags | undefined;

/**
 * Create a new `Injector` which is configured using a `defType` of `InjectorType<any>`s.
 */
export declare function ɵcreateInjector(defType: any, parent?: Injector | null, additionalProviders?: Array<Provider | StaticProvider> | null, name?: string): Injector;

/**
 * A list of CssSelectors.
 *
 * A directive or component can have multiple selectors. This type is used for
 * directive defs so any of the selectors in the list will match that directive.
 *
 * Original: 'form, [ngForm]'
 * Parsed: [['form'], ['', 'ngForm', '']]
 */
export declare type ɵCssSelectorList = CssSelector[];

/**
 * Index of each value in currency data (used to describe CURRENCIES_EN in currencies.ts)
 */
export declare const enum ɵCurrencyIndex {
    Symbol = 0,
    SymbolNarrow = 1,
    NbOfDigits = 2
}

/**
 * The locale id that the application is using by default (for translations and ICU expressions).
 */
export declare const ɵDEFAULT_LOCALE_ID = "en-US";

export declare const ɵdefaultIterableDiffers: IterableDiffers;

export declare const ɵdefaultKeyValueDiffers: KeyValueDiffers;

/**
 * **INTERNAL**, token used for configuring defer block behavior.
 */
export declare const ɵDEFER_BLOCK_CONFIG: InjectionToken<ɵDeferBlockConfig>;

/**
 * **INTERNAL**, avoid referencing it in application code.
 * *
 * Injector token that allows to provide `DeferBlockDependencyInterceptor` class
 * implementation.
 *
 * This token is only injected in devMode
 */
export declare const ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR: InjectionToken<ɵDeferBlockDependencyInterceptor>;

/**
 * Options for configuring defer blocks behavior.
 * @publicApi
 */
export declare enum ɵDeferBlockBehavior {
    /**
     * Manual triggering mode for defer blocks. Provides control over when defer blocks render
     * and which state they render.
     */
    Manual = 0,
    /**
     * Playthrough mode for defer blocks. This mode behaves like defer blocks would in a browser.
     * This is the default behavior in test environments.
     */
    Playthrough = 1
}

/**
 * Internal structure used for configuration of defer block behavior.
 * */
export declare interface ɵDeferBlockConfig {
    behavior: ɵDeferBlockBehavior;
}

/**
 * **INTERNAL**, avoid referencing it in application code.
 *
 * Describes a helper class that allows to intercept a call to retrieve current
 * dependency loading function and replace it with a different implementation.
 * This interceptor class is needed to allow testing blocks in different states
 * by simulating loading response.
 */
export declare interface ɵDeferBlockDependencyInterceptor {
    /**
     * Invoked for each defer block when dependency loading function is accessed.
     */
    intercept(dependencyFn: DependencyResolverFn | null): DependencyResolverFn | null;
    /**
     * Allows to configure an interceptor function.
     */
    setInterceptor(interceptorFn: (current: DependencyResolverFn) => DependencyResolverFn): void;
}

/**
 * Defer block instance for testing.
 */
export declare interface ɵDeferBlockDetails extends DehydratedDeferBlock {
    tDetails: TDeferBlockDetails;
}

/**
 * Describes the current state of this defer block instance.
 *
 * @publicApi
 */
export declare enum ɵDeferBlockState {
    /** The placeholder block content is rendered */
    Placeholder = 0,
    /** The loading block content is rendered */
    Loading = 1,
    /** The main content block content is rendered */
    Complete = 2,
    /** The error block content is rendered */
    Error = 3
}

/** The deps tracker to be used in the current Angular app in dev mode. */
export declare const ɵdepsTracker: DepsTracker;

export declare function ɵdetectChangesInViewIfRequired(lView: LView, notifyErrorHandler: boolean, isFirstPass: boolean, zonelessEnabled: boolean): void;


export declare function ɵdevModeEqual(a: any, b: any): boolean;

/**
 * Runtime link information for Directives.
 *
 * This is an internal data structure used by the render to link
 * directives into templates.
 *
 * NOTE: Always use `defineDirective` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * @param Selector type metadata specifying the selector of the directive or component
 *
 * See: {@link defineDirective}
 */
export declare interface ɵDirectiveDef<T> {
    /**
     * A dictionary mapping the inputs' public name to their minified property names
     * (along with flags if there are any).
     */
    readonly inputs: {
        [P in keyof T]?: string | [minifiedName: string, flags: InputFlags];
    };
    /**
     * A dictionary mapping the private names of inputs to their transformation functions.
     * Note: the private names are used for the keys, rather than the public ones, because public
     * names can be re-aliased in host directives which would invalidate the lookup.
     *
     * Note: Signal inputs will not have transforms captured here. This is because their
     * transform function is already integrated into the `InputSignal`.
     */
    readonly inputTransforms: {
        [classPropertyName: string]: InputTransformFunction;
    } | null;
    /**
     * Contains the raw input information produced by the compiler. Can be
     * used to do further processing after the `inputs` have been inverted.
     */
    readonly inputConfig: {
        [P in keyof T]?: string | [InputFlags, string, string?, InputTransformFunction?];
    };
    /**
     * @deprecated This is only here because `NgOnChanges` incorrectly uses declared name instead of
     * public or minified name.
     */
    readonly declaredInputs: Record<string, string>;
    /**
     * A dictionary mapping the outputs' minified property names to their public API names, which
     * are their aliases if any, or their original unminified property names
     * (as in `@Output('alias') propertyName: any;`).
     */
    readonly outputs: {
        [P in keyof T]?: string;
    };
    /**
     * Function to create and refresh content queries associated with a given directive.
     */
    contentQueries: ContentQueriesFunction<T> | null;
    /**
     * Query-related instructions for a directive. Note that while directives don't have a
     * view and as such view queries won't necessarily do anything, there might be
     * components that extend the directive.
     */
    viewQuery: ViewQueriesFunction<T> | null;
    /**
     * Refreshes host bindings on the associated directive.
     */
    readonly hostBindings: HostBindingsFunction<T> | null;
    /**
     * The number of bindings in this directive `hostBindings` (including pure fn bindings).
     *
     * Used to calculate the length of the component's LView array, so we
     * can pre-fill the array and set the host binding start index.
     */
    readonly hostVars: number;
    /**
     * Assign static attribute values to a host element.
     *
     * This property will assign static attribute values as well as class and style
     * values to a host element. Since attribute values can consist of different types of values, the
     * `hostAttrs` array must include the values in the following format:
     *
     * attrs = [
     *   // static attributes (like `title`, `name`, `id`...)
     *   attr1, value1, attr2, value,
     *
     *   // a single namespace value (like `x:id`)
     *   NAMESPACE_MARKER, namespaceUri1, name1, value1,
     *
     *   // another single namespace value (like `x:name`)
     *   NAMESPACE_MARKER, namespaceUri2, name2, value2,
     *
     *   // a series of CSS classes that will be applied to the element (no spaces)
     *   CLASSES_MARKER, class1, class2, class3,
     *
     *   // a series of CSS styles (property + value) that will be applied to the element
     *   STYLES_MARKER, prop1, value1, prop2, value2
     * ]
     *
     * All non-class and non-style attributes must be defined at the start of the list
     * first before all class and style values are set. When there is a change in value
     * type (like when classes and styles are introduced) a marker must be used to separate
     * the entries. The marker values themselves are set via entries found in the
     * [AttributeMarker] enum.
     */
    readonly hostAttrs: TAttributes | null;
    /** Token representing the directive. Used by DI. */
    readonly type: Type<T>;
    /** Function that resolves providers and publishes them into the DI system. */
    providersResolver: (<U extends T>(def: ɵDirectiveDef<U>, processProvidersFn?: ProcessProvidersFunction) => void) | null;
    /** The selectors that will be used to match nodes to this directive. */
    readonly selectors: ɵCssSelectorList;
    /**
     * Name under which the directive is exported (for use with local references in template)
     */
    readonly exportAs: string[] | null;
    /**
     * Whether this directive (or component) is standalone.
     */
    readonly standalone: boolean;
    /**
     * Whether this directive (or component) uses the signals authoring experience.
     */
    readonly signals: boolean;
    /**
     * Factory function used to create a new directive instance. Will be null initially.
     * Populated when the factory is first requested by directive instantiation logic.
     */
    readonly factory: FactoryFn<T> | null;
    /**
     * The features applied to this directive
     */
    readonly features: DirectiveDefFeature[] | null;
    /**
     * Info related to debugging/troubleshooting for this component. This info is only available in
     * dev mode.
     */
    debugInfo: ClassDebugInfo | null;
    /**
     * Function that will add the host directives to the list of matches during directive matching.
     * Patched onto the definition by the `HostDirectivesFeature`.
     * @param currentDef Definition that has been matched.
     * @param matchedDefs List of all matches for a specified node. Will be mutated to include the
     * host directives.
     * @param hostDirectiveDefs Mapping of directive definitions to their host directive
     * configuration. Host directives will be added to the map as they're being matched to the node.
     */
    findHostDirectiveDefs: ((currentDef: ɵDirectiveDef<unknown>, matchedDefs: ɵDirectiveDef<unknown>[], hostDirectiveDefs: HostDirectiveDefs) => void) | null;
    /**
     * Additional directives to be applied whenever the directive has been matched.
     *
     * `HostDirectiveConfig` objects represent a host directive that can be resolved eagerly and were
     * already pre-processed when the definition was created. A function needs to be resolved lazily
     * during directive matching, because it's a forward reference.
     *
     * **Note:** we can't `HostDirectiveConfig` in the array, because there's no way to distinguish if
     * a function in the array is a `Type` or a `() => HostDirectiveConfig[]`.
     */
    hostDirectives: (HostDirectiveDef | (() => HostDirectiveConfig[]))[] | null;
    setInput: (<U extends T>(this: ɵDirectiveDef<U>, instance: U, inputSignalNode: null | ɵInputSignalNode<unknown, unknown>, value: any, publicName: string, privateName: string) => void) | null;
}

/**
 * A subclass of `Type` which has a static `ɵdir`:`DirectiveDef` field making it
 * consumable for rendering.
 */
export declare interface ɵDirectiveType<T> extends Type<T> {
    ɵdir: unknown;
    ɵfac: unknown;
}

export declare function ɵdisableProfiling(): void;

/**
 * A scheduler which manages the execution of effects.
 */
export declare abstract class ɵEffectScheduler {
    /**
     * Schedule the given effect to be executed at a later time.
     *
     * It is an error to attempt to execute any effects synchronously during a scheduling operation.
     */
    abstract schedule(e: SchedulableEffect): void;
    /**
     * Run any scheduled effects.
     */
    abstract flush(): void;
    /** Remove a scheduled effect */
    abstract remove(e: SchedulableEffect): void;
    /** @nocollapse */
    static ɵprov: unknown;
}

/**
 * InjectionToken to control root component bootstrap behavior.
 *
 * This token is primarily used in Angular's server-side rendering (SSR) scenarios,
 * particularly by the `@angular/ssr` package, to manage whether the root component
 * should be bootstrapped during the application initialization process.
 *
 * ## Purpose:
 * During SSR route extraction, setting this token to `false` prevents Angular from
 * bootstrapping the root component. This avoids unnecessary component rendering,
 * enabling route extraction without requiring additional APIs or triggering
 * component logic.
 *
 * ## Behavior:
 * - **`false`**: Prevents the root component from being bootstrapped.
 * - **`true`** (default): Proceeds with the normal root component bootstrap process.
 *
 * This mechanism ensures SSR can efficiently separate route extraction logic
 * from component rendering.
 */
export declare const ɵENABLE_ROOT_COMPONENT_BOOTSTRAP: InjectionToken<boolean>;

/**
 * This enables an internal performance profiler
 *
 * It should not be imported in application code
 */
export declare function ɵenableProfiling(): void;

/**
 * Index of each type of locale data from the extra locale data array
 */
export declare const enum ɵExtraLocaleDataIndex {
    ExtraDayPeriodFormats = 0,
    ExtraDayPeriodStandalone = 1,
    ExtraDayPeriodsRules = 2
}

/**
 * Finds the locale data for a given locale.
 *
 * @param locale The locale code.
 * @returns The locale data.
 * @see [Internationalization (i18n) Guide](https://angular.io/guide/i18n)
 */
export declare function ɵfindLocaleData(locale: string): any;

/**
 * An argument list containing the first non-never type in the given type array, or an empty
 * argument list if there are no non-never types in the type array.
 */
export declare type ɵFirstAvailable<T extends unknown[]> = T extends [infer H, ...infer R] ? [H] extends [never] ? ɵFirstAvailable<R> : [H] : [];

/**
 * An argument list containing the first non-never type in the given type array, or an empty
 * argument list if there are no non-never types in the type array.
 */
export declare type ɵFirstAvailableSignal<T extends unknown[]> = T extends [infer H, ...infer R] ? [H] extends [never] ? ɵFirstAvailableSignal<R> : [Signal<H>] : [];

/**
 * Loops over queued module definitions, if a given module definition has all of its
 * declarations resolved, it dequeues that module definition and sets the scope on
 * its declarations.
 */
export declare function ɵflushModuleScopingQueueAsMuchAsPossible(): void;

/**
 * Called to format a runtime error.
 * See additional info on the `message` argument type in the `RuntimeError` class description.
 */
export declare function ɵformatRuntimeError<T extends number = ɵRuntimeErrorCode>(code: T, message: null | false | string): string;

export declare function ɵgenerateStandaloneInDeclarationsError(type: Type<any>, location: string): string;

/**
 * If a given component has unresolved async metadata - returns a reference
 * to a function that applies component metadata after resolving defer-loadable
 * dependencies. Otherwise - this function returns `null`.
 */
export declare function ɵgetAsyncClassMetadataFn(type: Type<unknown>): (() => Promise<Array<Type<unknown>>>) | null;

/**
 * Gets the class name of the closest component to a node.
 * Warning! this function will return minified names if the name of the component is minified. The
 * consumer of the function is responsible for resolving the minified name to its original name.
 * @param node Node from which to start the search.
 */
export declare function ɵgetClosestComponentName(node: Node): string | null;

/**
 * Retrieves all defer blocks in a given LView.
 *
 * @param lView lView with defer blocks
 * @param deferBlocks defer block aggregator array
 */
export declare function ɵgetDeferBlocks(lView: LView, deferBlocks: ɵDeferBlockDetails[]): void;

/**
 * Retrieves directive instances associated with a given DOM node. Does not include
 * component instances.
 *
 * @usageNotes
 * Given the following DOM structure:
 *
 * ```html
 * <app-root>
 *   <button my-button></button>
 *   <my-comp></my-comp>
 * </app-root>
 * ```
 *
 * Calling `getDirectives` on `<button>` will return an array with an instance of the `MyButton`
 * directive that is associated with the DOM node.
 *
 * Calling `getDirectives` on `<my-comp>` will return an empty array.
 *
 * @param node DOM node for which to get the directives.
 * @returns Array of directives associated with the node.
 *
 * @publicApi
 */
export declare function ɵgetDirectives(node: Node): {}[];

/**
 * Retrieves the host element of a component or directive instance.
 * The host element is the DOM element that matched the selector of the directive.
 *
 * @param componentOrDirective Component or directive instance for which the host
 *     element should be retrieved.
 * @returns Host element of the target.
 *
 * @publicApi
 */
export declare function ɵgetHostElement(componentOrDirective: {}): Element;

/**
 * Read the injectable def (`ɵprov`) for `type` in a way which is immune to accidentally reading
 * inherited value.
 *
 * @param type A type which may have its own (non-inherited) `ɵprov`.
 */
export declare function ɵgetInjectableDef<T>(type: any): ɵɵInjectableDeclaration<T> | null;

/**
 * Returns the matching `LContext` data for a given DOM node, directive or component instance.
 *
 * This function will examine the provided DOM element, component, or directive instance\'s
 * monkey-patched property to derive the `LContext` data. Once called then the monkey-patched
 * value will be that of the newly created `LContext`.
 *
 * If the monkey-patched value is the `LView` instance then the context value for that
 * target will be created and the monkey-patch reference will be updated. Therefore when this
 * function is called it may mutate the provided element\'s, component\'s or any of the associated
 * directive\'s monkey-patch values.
 *
 * If the monkey-patch value is not detected then the code will walk up the DOM until an element
 * is found which contains a monkey-patch reference. When that occurs then the provided element
 * will be updated with a new context (which is then returned). If the monkey-patch value is not
 * detected for a component/directive instance then it will throw an error (all components and
 * directives should be automatically monkey-patched by ivy).
 *
 * @param target Component, Directive or DOM Node.
 */
export declare function ɵgetLContext(target: any): ɵLContext | null;

/**
 * Retrieves the default currency code for the given locale.
 *
 * The default is defined as the first currency which is still in use.
 *
 * @param locale The code of the locale whose currency code we want.
 * @returns The code of the default currency for the given locale.
 *
 */
export declare function ɵgetLocaleCurrencyCode(locale: string): string | null;

/**
 * Retrieves the plural function used by ICU expressions to determine the plural case to use
 * for a given locale.
 * @param locale A locale code for the locale format rules to use.
 * @returns The plural function for the locale.
 * @see {@link NgPlural}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 */
export declare function ɵgetLocalePluralCase(locale: string): (value: number) => number;

/** Gets the owning `DestroyRef` for the given output. */
export declare function ɵgetOutputDestroyRef(ref: OutputRef<unknown>): DestroyRef | undefined;

export declare function ɵgetSanitizationBypassType(value: any): ɵBypassType | null;

/**
 * Gets the current value of the strict mode.
 */
export declare function ɵgetUnknownElementStrictMode(): boolean;

/**
 * Gets the current value of the strict mode.
 */
export declare function ɵgetUnknownPropertyStrictMode(): boolean;


export declare const ɵglobal: any;

/**
 * Default debug tools available under `window.ng`.
 */
export declare type ɵGlobalDevModeUtils = {
    [GLOBAL_PUBLISH_EXPANDO_KEY]: typeof globalUtilsFunctions;
};

export declare type ɵHydratedNode = {
    [HYDRATION_INFO_KEY]?: ɵHydrationInfo;
};

export declare type ɵHydrationInfo = {
    status: HydrationStatus.Hydrated | HydrationStatus.Skipped;
} | {
    status: HydrationStatus.Mismatched;
    actualNodeDetails: string | null;
    expectedNodeDetails: string | null;
};

/**
 * Injection token that configures the image optimized image functionality.
 * See {@link ImageConfig} for additional information about parameters that
 * can be used.
 *
 * @see {@link NgOptimizedImage}
 * @see {@link ImageConfig}
 * @publicApi
 */
export declare const ɵIMAGE_CONFIG: InjectionToken<ɵImageConfig>;

export declare const ɵIMAGE_CONFIG_DEFAULTS: ɵImageConfig;

/**
 * A configuration object for the image-related options. Contains:
 * - breakpoints: An array of integer breakpoints used to generate
 *      srcsets for responsive images.
 * - disableImageSizeWarning: A boolean value. Setting this to true will
 *      disable console warnings about oversized images.
 * - disableImageLazyLoadWarning: A boolean value. Setting this to true will
 *      disable console warnings about LCP images configured with `loading="lazy"`.
 * Learn more about the responsive image configuration in [the NgOptimizedImage
 * guide](guide/image-optimization).
 * Learn more about image warning options in [the related error page](errors/NG0913).
 * @publicApi
 */
export declare type ɵImageConfig = {
    breakpoints?: number[];
    placeholderResolution?: number;
    disableImageSizeWarning?: boolean;
    disableImageLazyLoadWarning?: boolean;
};

/** Returns a ChangeDetectorRef (a.k.a. a ViewRef) */
export declare function ɵinjectChangeDetectorRef(flags: InjectFlags): ChangeDetectorRef;

/**
 * An internal token whose presence in an injector indicates that the injector should treat itself
 * as a root scoped injector when processing requests for unknown tokens which may indicate
 * they are provided in the root scope.
 */
export declare const ɵINJECTOR_SCOPE: InjectionToken<InjectorScope | null>;

/**
 * An object that defines an injection context for the injector profiler.
 */
export declare interface ɵInjectorProfilerContext {
    /**
     *  The Injector that service is being injected into.
     *      - Example: if ModuleA --provides--> ServiceA --injects--> ServiceB
     *                 then inject(ServiceB) in ServiceA has ModuleA as an injector context
     */
    injector: Injector;
    /**
     *  The class where the constructor that is calling `inject` is located
     *      - Example: if ModuleA --provides--> ServiceA --injects--> ServiceB
     *                 then inject(ServiceB) in ServiceA has ServiceA as a construction context
     */
    token: Type<unknown> | null;
}

declare const ɵINPUT_SIGNAL_BRAND_READ_TYPE: unique symbol;

export declare const ɵINPUT_SIGNAL_BRAND_WRITE_TYPE: unique symbol;

/**
 * Reactive node type for an input signal. An input signal extends a signal.
 * There are special properties to enable transforms and required inputs.
 */
export declare interface ɵInputSignalNode<T, TransformT> extends SignalNode<T> {
    /**
     * User-configured transform that will run whenever a new value is applied
     * to the input signal node.
     */
    transformFn: ((value: TransformT) => T) | undefined;
    /**
     * Applies a new value to the input signal. Expects transforms to be run
     * manually before.
     *
     * This function is called by the framework runtime code whenever a binding
     * changes. The value can in practice be anything at runtime, but for typing
     * purposes we assume it's a valid `T` value. Type-checking will enforce that.
     */
    applyValueToInputSignal<T, TransformT>(node: ɵInputSignalNode<T, TransformT>, value: T): void;
    /**
     * A debug name for the input signal. Used in Angular DevTools to identify the signal.
     */
    debugName?: string;
}

/**
 * `InjectionToken` used to configure how to call the `ErrorHandler`.
 *
 * `NgZone` is provided by default today so the default (and only) implementation for this
 * is calling `ErrorHandler.handleError` outside of the Angular zone.
 */
export declare const ɵINTERNAL_APPLICATION_ERROR_HANDLER: InjectionToken<(e: any) => void>;

/**
 * Internal create application API that implements the core application creation logic and optional
 * bootstrap logic.
 *
 * Platforms (such as `platform-browser`) may require different set of application and platform
 * providers for an application to function correctly. As a result, platforms may use this function
 * internally and supply the necessary providers during the bootstrap, while exposing
 * platform-specific APIs as a part of their public API.
 *
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 */
export declare function ɵinternalCreateApplication(config: {
    rootComponent?: Type<unknown>;
    appProviders?: Array<Provider | EnvironmentProviders>;
    platformProviders?: Provider[];
}): Promise<ApplicationRef>;

export declare interface ɵInternalEnvironmentProviders extends EnvironmentProviders {
    ɵproviders: (Provider | EnvironmentProviders)[];
    /**
     * If present, indicates that the `EnvironmentProviders` were derived from NgModule providers.
     *
     * This is used to produce clearer error messages.
     */
    ɵfromNgModule?: true;
}

export declare function ɵinternalProvideZoneChangeDetection({ ngZoneFactory, ignoreChangesOutsideZone, scheduleInRootZone, }: {
    ngZoneFactory?: () => NgZone;
    ignoreChangesOutsideZone?: boolean;
    scheduleInRootZone?: boolean;
}): StaticProvider[];

/**
 * Internal token that specifies whether DOM reuse logic
 * during hydration is enabled.
 */
export declare const ɵIS_HYDRATION_DOM_REUSE_ENABLED: InjectionToken<boolean>;

/**
 * Internal token that indicates whether incremental hydration support
 * is enabled.
 */
export declare const ɵIS_INCREMENTAL_HYDRATION_ENABLED: InjectionToken<boolean>;

export declare function ɵisBoundToModule<C>(cf: ComponentFactory<C>): boolean;

export declare function ɵisComponentDefPendingResolution(type: Type<any>): boolean;

export declare function ɵisEnvironmentProviders(value: Provider | EnvironmentProviders | ɵInternalEnvironmentProviders): value is ɵInternalEnvironmentProviders;

export declare function ɵisInjectable(type: any): boolean;

export declare function ɵisNgModule<T>(value: Type<T>): value is Type<T> & {
    ɵmod: ɵNgModuleDef<T>;
};

/**
 * Determine if the argument is shaped like a Promise
 */
export declare function ɵisPromise<T = any>(obj: any): obj is Promise<T>;

/**
 * Determine if the argument is a Subscribable
 */
export declare function ɵisSubscribable<T>(obj: any | Subscribable<T>): obj is Subscribable<T>;

export declare const ɵJSACTION_EVENT_CONTRACT: InjectionToken<EventContractDetails>;

/**
 * The internal view context which is specific to a given DOM element, directive or
 * component instance. Each value in here (besides the LView and element node details)
 * can be present, null or undefined. If undefined then it implies the value has not been
 * looked up yet, otherwise, if null, then a lookup was executed and nothing was found.
 *
 * Each value will get filled when the respective value is examined within the getContext
 * function. The component, element and each directive instance will share the same instance
 * of the context.
 */
export declare class ɵLContext {
    /**
     * ID of the component's parent view data.
     */
    private lViewId;
    /**
     * The index instance of the node.
     */
    nodeIndex: number;
    /**
     * The instance of the DOM node that is attached to the lNode.
     */
    native: RNode;
    /**
     * The instance of the Component node.
     */
    component: {} | null | undefined;
    /**
     * The list of active directives that exist on this element.
     */
    directives: any[] | null | undefined;
    /**
     * The map of local references (local reference name => element or directive instance) that
     * exist on this element.
     */
    localRefs: {
        [key: string]: any;
    } | null | undefined;
    /** Component's parent view data. */
    get lView(): LView | null;
    constructor(
    /**
     * ID of the component's parent view data.
     */
    lViewId: number, 
    /**
     * The index instance of the node.
     */
    nodeIndex: number, 
    /**
     * The instance of the DOM node that is attached to the lNode.
     */
    native: RNode);
}

/**
 * Index of each type of locale data from the locale data array
 */
export declare enum ɵLocaleDataIndex {
    LocaleId = 0,
    DayPeriodsFormat = 1,
    DayPeriodsStandalone = 2,
    DaysFormat = 3,
    DaysStandalone = 4,
    MonthsFormat = 5,
    MonthsStandalone = 6,
    Eras = 7,
    FirstDayOfWeek = 8,
    WeekendRange = 9,
    DateFormat = 10,
    TimeFormat = 11,
    DateTimeFormat = 12,
    NumberSymbols = 13,
    NumberFormats = 14,
    CurrencyCode = 15,
    CurrencySymbol = 16,
    CurrencyName = 17,
    Currencies = 18,
    Directionality = 19,
    PluralCase = 20,
    ExtraData = 21
}

/**
 * Create a global `Effect` for the given reactive function.
 */
export declare function ɵmicrotaskEffect(effectFn: (onCleanup: EffectCleanupRegisterFn) => void, options?: CreateEffectOptions): EffectRef;

export declare class ɵMicrotaskEffectScheduler extends ZoneAwareEffectScheduler {
    private readonly pendingTasks;
    private taskId;
    schedule(effect: SchedulableEffect): void;
    flush(): void;
    /** @nocollapse */
    static ɵprov: unknown;
}


export declare const ɵNG_COMP_DEF: string;

export declare const ɵNG_DIR_DEF: string;

/**
 * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
 * the key and the directive's unique ID as the value. This allows us to map directives to their
 * bloom filter bit for DI.
 */
export declare const ɵNG_ELEMENT_ID: string;

export declare const ɵNG_INJ_DEF: string;

export declare const ɵNG_MOD_DEF: string;

export declare const ɵNG_PIPE_DEF: string;

export declare const ɵNG_PROV_DEF: string;

/**
 * Runtime link information for NgModules.
 *
 * This is the internal data structure used by the runtime to assemble components, directives,
 * pipes, and injectors.
 *
 * NOTE: Always use `ɵɵdefineNgModule` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 */
export declare interface ɵNgModuleDef<T> {
    /** Token representing the module. Used by DI. */
    type: T;
    /**
     * List of components to bootstrap.
     *
     * @see {NgModuleScopeInfoFromDecorator} This field is only used in global compilation mode. In local compilation mode the bootstrap info is computed and added in runtime.
     */
    bootstrap: Type<any>[] | (() => Type<any>[]);
    /** List of components, directives, and pipes declared by this module. */
    declarations: Type<any>[] | (() => Type<any>[]);
    /** List of modules or `ModuleWithProviders` imported by this module. */
    imports: Type<any>[] | (() => Type<any>[]);
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     */
    exports: Type<any>[] | (() => Type<any>[]);
    /**
     * Cached value of computed `transitiveCompileScopes` for this module.
     *
     * This should never be read directly, but accessed via `transitiveScopesFor`.
     */
    transitiveCompileScopes: ɵNgModuleTransitiveScopes | null;
    /** The set of schemas that declare elements to be allowed in the NgModule. */
    schemas: SchemaMetadata[] | null;
    /** Unique ID for the module with which it should be registered.  */
    id: string | null;
}

export declare class ɵNgModuleFactory<T> extends NgModuleFactory<T> {
    moduleType: Type<T>;
    constructor(moduleType: Type<T>);
    create(parentInjector: Injector | null): NgModuleRef<T>;
}

/**
 * Represents the expansion of an `NgModule` into its scopes.
 *
 * A scope is a set of directives and pipes that are visible in a particular context. Each
 * `NgModule` has two scopes. The `compilation` scope is the set of directives and pipes that will
 * be recognized in the templates of components declared by the module. The `exported` scope is the
 * set of directives and pipes exported by a module (that is, module B's exported scope gets added
 * to module A's compilation scope when module A imports B).
 */
export declare interface ɵNgModuleTransitiveScopes {
    compilation: {
        directives: Set<any>;
        pipes: Set<any>;
    };
    exported: {
        directives: Set<any>;
        pipes: Set<any>;
    };
    schemas: SchemaMetadata[] | null;
}

export declare interface ɵNgModuleType<T = any> extends Type<T> {
    ɵmod: ɵNgModuleDef<T>;
}


export declare interface ɵNO_CHANGE {
    __brand__: 'NO_CHANGE';
}

/** A special value which designates that a value has not changed. */
export declare const ɵNO_CHANGE: ɵNO_CHANGE;

/**
 * Provides a noop implementation of `NgZone` which does nothing. This zone requires explicit calls
 * to framework to perform rendering.
 */
export declare class ɵNoopNgZone implements NgZone {
    readonly hasPendingMicrotasks = false;
    readonly hasPendingMacrotasks = false;
    readonly isStable = true;
    readonly onUnstable: EventEmitter<any>;
    readonly onMicrotaskEmpty: EventEmitter<any>;
    readonly onStable: EventEmitter<any>;
    readonly onError: EventEmitter<any>;
    run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any): T;
    runGuarded<T>(fn: (...args: any[]) => any, applyThis?: any, applyArgs?: any): T;
    runOutsideAngular<T>(fn: (...args: any[]) => T): T;
    runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any, name?: string): T;
}


/**
 * Convince closure compiler that the wrapped function has no side-effects.
 *
 * Closure compiler always assumes that `toString` has no side-effects. We use this quirk to
 * allow us to execute a function but have closure compiler mark the call as no-side-effects.
 * It is important that the return value for the `noSideEffects` function be assigned
 * to something which is retained otherwise the call to `noSideEffects` will be removed by closure
 * compiler.
 */
export declare function ɵnoSideEffects<T>(fn: () => T): T;


export declare const ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR: {};

export declare const enum ɵNotificationSource {
    MarkAncestorsForTraversal = 0,
    SetInput = 1,
    DeferBlockStateUpdate = 2,
    DebugApplyChanges = 3,
    MarkForCheck = 4,
    Listener = 5,
    CustomElement = 6,
    RenderHook = 7,
    DeferredRenderHook = 8,
    ViewAttached = 9,
    ViewDetachedFromDOM = 10,
    AsyncAnimationsLoaded = 11,
    PendingTaskRemoved = 12,
    RootEffect = 13,
    ViewEffect = 14
}

/**
 * Patch the definition of a component with directives and pipes from the compilation scope of
 * a given module.
 */
export declare function ɵpatchComponentDefWithScope<C>(componentDef: ɵComponentDef<C>, transitiveScopes: ɵNgModuleTransitiveScopes): void;

/**
 * Internal implementation of the pending tasks service.
 */
export declare class ɵPendingTasksInternal implements OnDestroy {
    private taskId;
    private pendingTasks;
    private get _hasPendingTasks();
    hasPendingTasks: BehaviorSubject<boolean>;
    add(): number;
    has(taskId: number): boolean;
    remove(taskId: number): void;
    ngOnDestroy(): void;
    /** @nocollapse */
    static ɵprov: unknown;
}


export declare const ɵPERFORMANCE_MARK_PREFIX = "\uD83C\uDD70\uFE0F";


/**
 * A guarded `performance.mark` for feature marking.
 *
 * This method exists because while all supported browser and node.js version supported by Angular
 * support performance.mark API. This is not the case for other environments such as JSDOM and
 * Cloudflare workers.
 */
export declare function ɵperformanceMarkFeature(feature: string): void;

/**
 * Runtime link information for Pipes.
 *
 * This is an internal data structure used by the renderer to link
 * pipes into templates.
 *
 * NOTE: Always use `definePipe` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * See: {@link definePipe}
 */
export declare interface ɵPipeDef<T> {
    /** Token representing the pipe. */
    type: Type<T>;
    /**
     * Pipe name.
     *
     * Used to resolve pipe in templates.
     */
    readonly name: string;
    /**
     * Factory function used to create a new pipe instance. Will be null initially.
     * Populated when the factory is first requested by pipe instantiation logic.
     */
    factory: FactoryFn<T> | null;
    /**
     * Whether or not the pipe is pure.
     *
     * Pure pipes result only depends on the pipe input and not on internal
     * state of the pipe.
     */
    readonly pure: boolean;
    /**
     * Whether this pipe is standalone.
     */
    readonly standalone: boolean;
    onDestroy: (() => void) | null;
}

/**
 * Profiler function which the runtime will invoke before and after user code.
 */
export declare interface ɵProfiler {
    (event: ɵProfilerEvent, instance?: {} | null, hookOrListener?: (e?: any) => any): void;
}

/**
 * Profiler events is an enum used by the profiler to distinguish between different calls of user
 * code invoked throughout the application lifecycle.
 */
export declare const enum ɵProfilerEvent {
    /**
     * Corresponds to the point in time before the runtime has called the template function of a
     * component with `RenderFlags.Create`.
     */
    TemplateCreateStart = 0,
    /**
     * Corresponds to the point in time after the runtime has called the template function of a
     * component with `RenderFlags.Create`.
     */
    TemplateCreateEnd = 1,
    /**
     * Corresponds to the point in time before the runtime has called the template function of a
     * component with `RenderFlags.Update`.
     */
    TemplateUpdateStart = 2,
    /**
     * Corresponds to the point in time after the runtime has called the template function of a
     * component with `RenderFlags.Update`.
     */
    TemplateUpdateEnd = 3,
    /**
     * Corresponds to the point in time before the runtime has called a lifecycle hook of a component
     * or directive.
     */
    LifecycleHookStart = 4,
    /**
     * Corresponds to the point in time after the runtime has called a lifecycle hook of a component
     * or directive.
     */
    LifecycleHookEnd = 5,
    /**
     * Corresponds to the point in time before the runtime has evaluated an expression associated with
     * an event or an output.
     */
    OutputStart = 6,
    /**
     * Corresponds to the point in time after the runtime has evaluated an expression associated with
     * an event or an output.
     */
    OutputEnd = 7,
    /**
     * Corresponds to the point in time just before application bootstrap.
     */
    BootstrapApplicationStart = 8,
    /**
     * Corresponds to the point in time after application bootstrap.
     */
    BootstrapApplicationEnd = 9,
    /**
     * Corresponds to the point in time just before root component bootstrap.
     */
    BootstrapComponentStart = 10,
    /**
     * Corresponds to the point in time after root component bootstrap.
     */
    BootstrapComponentEnd = 11,
    /**
     * Corresponds to the point in time just before Angular starts a change detection tick.
     */
    ChangeDetectionStart = 12,
    /**
     * Corresponds to the point in time after Angular ended a change detection tick.
     */
    ChangeDetectionEnd = 13,
    /**
     * Corresponds to the point in time just before Angular starts a new synchronization pass of change detection tick.
     */
    ChangeDetectionSyncStart = 14,
    /**
     * Corresponds to the point in time after Angular ended a synchronization pass.
     */
    ChangeDetectionSyncEnd = 15,
    /**
     * Corresponds to the point in time just before Angular executes after render hooks.
     */
    AfterRenderHooksStart = 16,
    /**
     * Corresponds to the point in time after Angular executed after render hooks.
     */
    AfterRenderHooksEnd = 17,
    /**
     * Corresponds to the point in time just before Angular starts processing a component (create or update).
     */
    ComponentStart = 18,
    /**
     * Corresponds to the point in time after Angular finished processing a component.
     */
    ComponentEnd = 19,
    /**
     * Corresponds to the point in time just before a defer block transitions between states.
     */
    DeferBlockStateStart = 20,
    /**
     * Corresponds to the point in time after a defer block transitioned between states.
     */
    DeferBlockStateEnd = 21,
    /**
     * Corresponds to the point in time just before a component instance is created dynamically.
     */
    DynamicComponentStart = 22,
    /**
     * Corresponds to the point in time after a a component instance is created dynamically.
     */
    DynamicComponentEnd = 23,
    /**
     * Corresponds to the point in time before the runtime has called the host bindings function
     * of a directive.
     */
    HostBindingsUpdateStart = 24,
    /**
     * Corresponds to the point in time after the runtime has called the host bindings function
     * of a directive.
     */
    HostBindingsUpdateEnd = 25
}

/**
 * Internal token used to verify that `provideZoneChangeDetection` is not used
 * with the bootstrapModule API.
 */
export declare const ɵPROVIDED_NG_ZONE: InjectionToken<boolean>;

/**
 * An object that contains information about a provider that has been configured
 *
 * TODO: rename to indicate that it is a debug structure eg. ProviderDebugInfo.
 */
export declare interface ɵProviderRecord {
    /**
     * DI token that this provider is configuring
     */
    token: Type<unknown> | InjectionToken<unknown>;
    /**
     * Determines if provider is configured as view provider.
     */
    isViewProvider: boolean;
    /**
     * The raw provider associated with this ProviderRecord.
     */
    provider: SingleProvider;
    /**
     * The path of DI containers that were followed to import this provider
     */
    importPath?: Type<unknown>[];
}

/**
 * Publishes the given function to `window.ng` from package other than @angular/core
 * So that it can be used from the browser console when an application is not in production.
 */
export declare function ɵpublishExternalGlobalUtil<K extends ExternalGlobalUtilsFunctions>(name: K, fn: NgGlobalPublishUtils[K]): void;

export declare function ɵreadHydrationInfo(node: RNode): ɵHydrationInfo | null;

export declare class ɵReflectionCapabilities implements PlatformReflectionCapabilities {
    private _reflect;
    constructor(reflect?: any);
    factory<T>(t: Type<T>): (args: any[]) => T;
    private _ownParameters;
    parameters(type: Type<any>): any[][];
    private _ownAnnotations;
    annotations(typeOrFunc: Type<any>): any[];
    private _ownPropMetadata;
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    ownPropMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    hasLifecycleHook(type: any, lcProperty: string): boolean;
}

/**
 * Register locale data to be used internally by Angular. See the
 * ["I18n guide"](guide/i18n/format-data-locale) to know how to import additional locale
 * data.
 *
 * The signature `registerLocaleData(data: any, extraData?: any)` is deprecated since v5.1
 */
export declare function ɵregisterLocaleData(data: any, localeId?: string | any, extraData?: any): void;

/**
 * ComponentFactory interface implementation.
 */
export declare class ɵRender3ComponentFactory<T> extends ComponentFactory<T> {
    private componentDef;
    private ngModule?;
    selector: string;
    componentType: Type<any>;
    ngContentSelectors: string[];
    isBoundToModule: boolean;
    get inputs(): {
        propName: string;
        templateName: string;
        isSignal: boolean;
        transform?: (value: any) => any;
    }[];
    get outputs(): {
        propName: string;
        templateName: string;
    }[];
    /**
     * @param componentDef The component definition.
     * @param ngModule The NgModuleRef to which the factory is bound.
     */
    constructor(componentDef: ɵComponentDef<any>, ngModule?: NgModuleRef<any> | undefined);
    create(injector: Injector, projectableNodes?: any[][] | undefined, rootSelectorOrNode?: any, environmentInjector?: NgModuleRef<any> | EnvironmentInjector | undefined): ComponentRef<T>;
}

/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 *
 */
export declare class ɵRender3ComponentRef<T> extends ComponentRef<T> {
    private _rootLView;
    instance: T;
    hostView: ɵViewRef<T>;
    changeDetectorRef: ChangeDetectorRef;
    componentType: Type<T>;
    location: ElementRef;
    private previousInputValues;
    private _tNode;
    constructor(componentType: Type<T>, _rootLView: LView);
    setInput(name: string, value: unknown): void;
    get injector(): Injector;
    destroy(): void;
    onDestroy(callback: () => void): void;
}

export declare class ɵRender3NgModuleRef<T> extends NgModuleRef<T> implements InternalNgModuleRef<T> {
    private readonly ngModuleType;
    _parent: Injector | null;
    _bootstrapComponents: Type<any>[];
    private readonly _r3Injector;
    instance: T;
    destroyCbs: (() => void)[] | null;
    readonly componentFactoryResolver: ComponentFactoryResolver_2;
    constructor(ngModuleType: Type<T>, _parent: Injector | null, additionalProviders: StaticProvider[], runInjectorInitializers?: boolean);
    resolveInjectorInitializers(): void;
    get injector(): EnvironmentInjector;
    destroy(): void;
    onDestroy(callback: () => void): void;
}

/** Rendering Helpers */
/**
 * Transitions a defer block to the new state. Updates the  necessary
 * data structures and renders corresponding block.
 *
 * @param newState New state that should be applied to the defer block.
 * @param tNode TNode that represents a defer block.
 * @param lContainer Represents an instance of a defer block.
 * @param skipTimerScheduling Indicates that `@loading` and `@placeholder` block
 *   should be rendered immediately, even if they have `after` or `minimum` config
 *   options setup. This flag to needed for testing APIs to transition defer block
 *   between states via `DeferFixture.render` method.
 */
export declare function ɵrenderDeferBlockState(newState: ɵDeferBlockState, tNode: TNode, lContainer: LContainer, skipTimerScheduling?: boolean): void;

/**
 * Flags passed into template functions to determine which blocks (i.e. creation, update)
 * should be executed.
 *
 * Typically, a template runs both the creation block and the update block on initialization and
 * subsequent runs only execute the update block. However, dynamically created views require that
 * the creation block be executed separately from the update block (for backwards compat).
 */
export declare const enum ɵRenderFlags {
    Create = 1,
    Update = 2
}

export declare function ɵresetCompiledComponents(): void;

export declare function ɵresetJitOptions(): void;

/**
 * Used to resolve resource URLs on `@Component` when used with JIT compilation.
 *
 * Example:
 * ```ts
 * @Component({
 *   selector: 'my-comp',
 *   templateUrl: 'my-comp.html', // This requires asynchronous resolution
 * })
 * class MyComponent{
 * }
 *
 * // Calling `renderComponent` will fail because `renderComponent` is a synchronous process
 * // and `MyComponent`'s `@Component.templateUrl` needs to be resolved asynchronously.
 *
 * // Calling `resolveComponentResources()` will resolve `@Component.templateUrl` into
 * // `@Component.template`, which allows `renderComponent` to proceed in a synchronous manner.
 *
 * // Use browser's `fetch()` function as the default resource resolution strategy.
 * resolveComponentResources(fetch).then(() => {
 *   // After resolution all URLs have been converted into `template` strings.
 *   renderComponent(MyComponent);
 * });
 *
 * ```
 *
 * NOTE: In AOT the resolution happens during compilation, and so there should be no need
 * to call this method outside JIT mode.
 *
 * @param resourceResolver a function which is responsible for returning a `Promise` to the
 * contents of the resolved URL. Browser's `fetch()` method is a good default implementation.
 */
export declare function ɵresolveComponentResources(resourceResolver: (url: string) => Promise<string | {
    text(): Promise<string>;
}>): Promise<void>;

/**
 * Implementation for `resource()` which uses a `linkedSignal` to manage the resource's state.
 */
export declare class ɵResourceImpl<T, R> extends BaseWritableResource<T> implements ResourceRef<T> {
    private readonly loaderFn;
    private readonly defaultValue;
    private readonly equal;
    private readonly pendingTasks;
    /**
     * The current state of the resource. Status, value, and error are derived from this.
     */
    private readonly state;
    /**
     * Combines the current request with a reload counter which allows the resource to be reloaded on
     * imperative command.
     */
    protected readonly extRequest: WritableSignal<WrappedRequest>;
    private readonly effectRef;
    private pendingController;
    private resolvePendingTask;
    private destroyed;
    constructor(request: () => R, loaderFn: ResourceStreamingLoader<T, R>, defaultValue: T, equal: ValueEqualityFn_2<T> | undefined, injector: Injector);
    readonly status: Signal<ResourceStatus>;
    readonly error: Signal<unknown>;
    /**
     * Called either directly via `WritableResource.set` or via `.value.set()`.
     */
    set(value: T): void;
    reload(): boolean;
    destroy(): void;
    private loadEffect;
    private abortInProgressLoad;
}

export declare function ɵrestoreComponentResolutionQueue(queue: Map<Type<any>, Component>): void;

/**
 * Class that represents a runtime error.
 * Formats and outputs the error message in a consistent way.
 *
 * Example:
 * ```ts
 *  throw new RuntimeError(
 *    RuntimeErrorCode.INJECTOR_ALREADY_DESTROYED,
 *    ngDevMode && 'Injector has already been destroyed.');
 * ```
 *
 * Note: the `message` argument contains a descriptive error message as a string in development
 * mode (when the `ngDevMode` is defined). In production mode (after tree-shaking pass), the
 * `message` argument becomes `false`, thus we account for it in the typings and the runtime
 * logic.
 */
export declare class ɵRuntimeError<T extends number = ɵRuntimeErrorCode> extends Error {
    code: T;
    constructor(code: T, message: null | false | string);
}


/**
 * The list of error codes used in runtime code of the `core` package.
 * Reserved error code range: 100-999.
 *
 * Note: the minus sign denotes the fact that a particular code has a detailed guide on
 * angular.io. This extra annotation is needed to avoid introducing a separate set to store
 * error codes which have guides, which might leak into runtime code.
 *
 * Full list of available error guides can be found at https://angular.dev/errors.
 *
 * Error code ranges per package:
 *  - core (this package): 100-999
 *  - forms: 1000-1999
 *  - common: 2000-2999
 *  - animations: 3000-3999
 *  - router: 4000-4999
 *  - platform-browser: 5000-5500
 */
export declare const enum ɵRuntimeErrorCode {
    EXPRESSION_CHANGED_AFTER_CHECKED = -100,
    RECURSIVE_APPLICATION_REF_TICK = 101,
    INFINITE_CHANGE_DETECTION = 103,
    CYCLIC_DI_DEPENDENCY = -200,
    PROVIDER_NOT_FOUND = -201,
    INVALID_FACTORY_DEPENDENCY = 202,
    MISSING_INJECTION_CONTEXT = -203,
    INVALID_INJECTION_TOKEN = 204,
    INJECTOR_ALREADY_DESTROYED = 205,
    PROVIDER_IN_WRONG_CONTEXT = 207,
    MISSING_INJECTION_TOKEN = 208,
    INVALID_MULTI_PROVIDER = -209,
    MISSING_DOCUMENT = 210,
    MULTIPLE_COMPONENTS_MATCH = -300,
    EXPORT_NOT_FOUND = -301,
    PIPE_NOT_FOUND = -302,
    UNKNOWN_BINDING = 303,
    UNKNOWN_ELEMENT = 304,
    TEMPLATE_STRUCTURE_ERROR = 305,
    INVALID_EVENT_BINDING = 306,
    HOST_DIRECTIVE_UNRESOLVABLE = 307,
    HOST_DIRECTIVE_NOT_STANDALONE = 308,
    DUPLICATE_DIRECTIVE = 309,
    HOST_DIRECTIVE_COMPONENT = 310,
    HOST_DIRECTIVE_UNDEFINED_BINDING = 311,
    HOST_DIRECTIVE_CONFLICTING_ALIAS = 312,
    MULTIPLE_MATCHING_PIPES = 313,
    UNINITIALIZED_LET_ACCESS = 314,
    MULTIPLE_PLATFORMS = 400,
    PLATFORM_NOT_FOUND = 401,
    MISSING_REQUIRED_INJECTABLE_IN_BOOTSTRAP = 402,
    BOOTSTRAP_COMPONENTS_NOT_FOUND = -403,
    PLATFORM_ALREADY_DESTROYED = 404,
    ASYNC_INITIALIZERS_STILL_RUNNING = 405,
    APPLICATION_REF_ALREADY_DESTROYED = 406,
    RENDERER_NOT_FOUND = 407,
    PROVIDED_BOTH_ZONE_AND_ZONELESS = 408,
    HYDRATION_NODE_MISMATCH = -500,
    HYDRATION_MISSING_SIBLINGS = -501,
    HYDRATION_MISSING_NODE = -502,
    UNSUPPORTED_PROJECTION_DOM_NODES = -503,
    INVALID_SKIP_HYDRATION_HOST = -504,
    MISSING_HYDRATION_ANNOTATIONS = -505,
    HYDRATION_STABLE_TIMEDOUT = -506,
    MISSING_SSR_CONTENT_INTEGRITY_MARKER = -507,
    MISCONFIGURED_INCREMENTAL_HYDRATION = 508,
    SIGNAL_WRITE_FROM_ILLEGAL_CONTEXT = 600,
    REQUIRE_SYNC_WITHOUT_SYNC_EMIT = 601,
    ASSERTION_NOT_INSIDE_REACTIVE_CONTEXT = -602,
    INVALID_I18N_STRUCTURE = 700,
    MISSING_LOCALE_DATA = 701,
    DEFER_LOADING_FAILED = -750,
    IMPORT_PROVIDERS_FROM_STANDALONE = 800,
    INVALID_DIFFER_INPUT = 900,
    NO_SUPPORTING_DIFFER_FACTORY = 901,
    VIEW_ALREADY_ATTACHED = 902,
    INVALID_INHERITANCE = 903,
    UNSAFE_VALUE_IN_RESOURCE_URL = 904,
    UNSAFE_VALUE_IN_SCRIPT = 905,
    MISSING_GENERATED_DEF = 906,
    TYPE_IS_NOT_STANDALONE = 907,
    MISSING_ZONEJS = 908,
    UNEXPECTED_ZONE_STATE = 909,
    UNSAFE_IFRAME_ATTRS = -910,
    VIEW_ALREADY_DESTROYED = 911,
    COMPONENT_ID_COLLISION = -912,
    IMAGE_PERFORMANCE_WARNING = -913,
    UNEXPECTED_ZONEJS_PRESENT_IN_ZONELESS_MODE = 914,
    REQUIRED_INPUT_NO_VALUE = -950,
    REQUIRED_QUERY_NO_VALUE = -951,
    REQUIRED_MODEL_NO_VALUE = 952,
    OUTPUT_REF_DESTROYED = 953,
    LOOP_TRACK_DUPLICATE_KEYS = -955,
    LOOP_TRACK_RECREATE = -956,
    RUNTIME_DEPS_INVALID_IMPORTED_TYPE = 980,
    RUNTIME_DEPS_ORPHAN_COMPONENT = 981
}

/**
 * Marker interface for a value that's safe to use as HTML.
 *
 * @publicApi
 */
export declare interface ɵSafeHtml extends ɵSafeValue {
}

/**
 * Marker interface for a value that's safe to use as a URL to load executable code from.
 *
 * @publicApi
 */
export declare interface ɵSafeResourceUrl extends ɵSafeValue {
}

/**
 * Marker interface for a value that's safe to use as JavaScript.
 *
 * @publicApi
 */
export declare interface ɵSafeScript extends ɵSafeValue {
}

/**
 * Marker interface for a value that's safe to use as style (CSS).
 *
 * @publicApi
 */
export declare interface ɵSafeStyle extends ɵSafeValue {
}

/**
 * Marker interface for a value that's safe to use as a URL linking to a document.
 *
 * @publicApi
 */
export declare interface ɵSafeUrl extends ɵSafeValue {
}

/**
 * Marker interface for a value that's safe to use in a particular context.
 *
 * @publicApi
 */
export declare interface ɵSafeValue {
}

/**
 * Control whether the NgModule registration system enforces that each NgModule type registered has
 * a unique id.
 *
 * This is useful for testing as the NgModule registry cannot be properly reset between tests with
 * Angular's current API.
 */
export declare function ɵsetAllowDuplicateNgModuleIdsForTest(allowDuplicates: boolean): void;


export declare function ɵsetAlternateWeakRefImpl(impl: unknown): void;

/**
 * Sets the debug info for an Angular class.
 *
 * This runtime is guarded by ngDevMode flag.
 */
export declare function ɵsetClassDebugInfo(type: Type<any>, debugInfo: ClassDebugInfo): void;

/**
 * Adds decorator, constructor, and property metadata to a given type via static metadata fields
 * on the type.
 *
 * These metadata fields can later be read with Angular's `ReflectionCapabilities` API.
 *
 * Calls to `setClassMetadata` can be guarded by ngDevMode, resulting in the metadata assignments
 * being tree-shaken away during production builds.
 */
export declare function ɵsetClassMetadata(type: Type<any>, decorators: any[] | null, ctorParameters: (() => any[]) | null, propDecorators: {
    [field: string]: any;
} | null): void;

/**
 * Handles the process of applying metadata info to a component class in case
 * component template has defer blocks (thus some dependencies became deferrable).
 *
 * @param type Component class where metadata should be added
 * @param dependencyLoaderFn Function that loads dependencies
 * @param metadataSetterFn Function that forms a scope in which the `setClassMetadata` is invoked
 */
export declare function ɵsetClassMetadataAsync(type: Type<any>, dependencyLoaderFn: () => Array<Promise<Type<unknown>>>, metadataSetterFn: (...types: Type<unknown>[]) => void): () => Promise<Array<Type<unknown>>>;

export declare function ɵsetCurrentInjector(injector: Injector | null | undefined): Injector | undefined | null;


/**
 * Tell ivy what the `document` is for this platform.
 *
 * It is only necessary to call this if the current platform is not a browser.
 *
 * @param document The object representing the global `document` in this environment.
 */
export declare function ɵsetDocument(document: Document | undefined): void;

export declare function ɵsetInjectorProfilerContext(context: ɵInjectorProfilerContext): ɵInjectorProfilerContext;


/**
 * Sets the locale id that will be used for translations and ICU expressions.
 * This is the ivy version of `LOCALE_ID` that was defined as an injection token for the view engine
 * but is now defined as a global value.
 *
 * @param localeId
 */
export declare function ɵsetLocaleId(localeId: string): void;

/**
 * Sets a strict mode for JIT-compiled components to throw an error on unknown elements,
 * instead of just logging the error.
 * (for AOT-compiled ones this check happens at build time).
 */
export declare function ɵsetUnknownElementStrictMode(shouldThrow: boolean): void;

/**
 * Sets a strict mode for JIT-compiled components to throw an error on unknown properties,
 * instead of just logging the error.
 * (for AOT-compiled ones this check happens at build time).
 */
export declare function ɵsetUnknownPropertyStrictMode(shouldThrow: boolean): void;

export { ɵSIGNAL }

/**
 * Marker used in a comment node to ensure hydration content integrity
 */
export declare const ɵSSR_CONTENT_INTEGRITY_MARKER = "nghm";

/**
 * Function that will start measuring against the performance API
 * Should be used in pair with stopMeasuring
 */
export declare function ɵstartMeasuring<T>(label: string): void;

/**
 * Function that will stop measuring against the performance API
 * Should be used in pair with stopMeasuring
 */
export declare function ɵstopMeasuring(label: string): void;

/** Store a value in the `data` at a given `index`. */
export declare function ɵstore<T>(tView: TView, lView: LView, index: number, value: T): void;


export declare function ɵstringify(token: any): string;

/**
 * Internal injection token that can used to access an instance of a Testability class.
 *
 * This token acts as a bridge between the core bootstrap code and the `Testability` class. This is
 * needed to ensure that there are no direct references to the `Testability` class, so it can be
 * tree-shaken away (if not referenced). For the environments/setups when the `Testability` class
 * should be available, this token is used to add a provider that references the `Testability`
 * class. Otherwise, only this token is retained in a bundle, but the `Testability` class is not.
 */
export declare const ɵTESTABILITY: InjectionToken<Testability>;

/**
 * Internal injection token to retrieve Testability getter class instance.
 */
export declare const ɵTESTABILITY_GETTER: InjectionToken<GetTestability>;

/** Actions that are supported by the tracing framework. */
export declare enum ɵTracingAction {
    CHANGE_DETECTION = 0,
    AFTER_NEXT_RENDER = 1
}

/**
 * Injection token for a `TracingService`, optionally provided.
 */
export declare const ɵTracingService: InjectionToken<ɵTracingService<ɵTracingSnapshot>>;

/**
 * Tracing mechanism which can associate causes (snapshots) with runs of
 * subsequent operations.
 *
 * Not defined by Angular directly, but defined in contexts where tracing is
 * desired.
 */
export declare interface ɵTracingService<T extends ɵTracingSnapshot> {
    /**
     * Take a snapshot of the current context which will be stored by Angular and
     * used when additional work is performed that was scheduled in this context.
     *
     * @param linkedSnapshot Optional snapshot to use link to the current context.
     * The caller is no longer responsible for calling dispose on the linkedSnapshot.
     *
     * @return The tracing snapshot. The caller is responsible for diposing of the
     * snapshot.
     */
    snapshot(linkedSnapshot: T | null): T;
    /**
     * Wrap an event listener bound by the framework for tracing.
     * @param element Element on which the event is bound.
     * @param eventName Name of the event.
     * @param handler Event handler.
     * @return A new event handler to be bound instead of the original one.
     */
    wrapEventListener?<T extends Function>(element: HTMLElement, eventName: string, handler: T): T;
}

/** A single tracing snapshot. */
export declare interface ɵTracingSnapshot {
    run<T>(action: ɵTracingAction, fn: () => T): T;
    /** Disposes of the tracing snapshot. Must be run exactly once per TracingSnapshot. */
    dispose(): void;
}

/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given type
 * (either a NgModule or a standalone component / directive / pipe).
 */
export declare function ɵtransitiveScopesFor<T>(type: Type<T>): ɵNgModuleTransitiveScopes;

/**
 * Trigger loading of defer block dependencies if the process hasn't started yet.
 *
 * @param tDetails Static information about this defer block.
 * @param lView LView of a host view.
 */
export declare function ɵtriggerResourceLoading(tDetails: TDeferBlockDetails, lView: LView, tNode: TNode): Promise<unknown>;

/**
 * Ellipses the string in the middle when longer than the max length
 *
 * @param string
 * @param maxLength of the output string
 * @returns ellipsed string with ... in the middle
 */
export declare function ɵtruncateMiddle(str: string, maxLength?: number): string;

/**
 * Helper function to remove all the locale data from `LOCALE_DATA`.
 */
export declare function ɵunregisterLocaleData(): void;

/**
 * Unwraps all `InputSignal`/`InputSignalWithTransform` class fields of
 * the given directive.
 */
export declare type ɵUnwrapDirectiveSignalInputs<Dir, Fields extends keyof Dir> = {
    [P in Fields]: ɵUnwrapInputSignalWriteType<Dir[P]>;
};

/** Retrieves the write type of an `InputSignal` and `InputSignalWithTransform`. */
declare type ɵUnwrapInputSignalWriteType<Field> = Field extends InputSignalWithTransform<any, infer WriteT> ? WriteT : never;

export declare function ɵunwrapSafeValue(value: ɵSafeValue): string;

export declare function ɵunwrapSafeValue<T>(value: T): T;

/**
 * Utility function used during template type checking to extract the value from a `WritableSignal`.
 * @codeGenApi
 */
export declare function ɵunwrapWritableSignal<T>(value: T | {
    [ɵWRITABLE_SIGNAL]: T;
}): T;

/**
 * Indicates whether to use the runtime dependency tracker for scope calculation in JIT compilation.
 * The value "false" means the old code path based on patching scope info into the types will be
 * used.
 *
 * @deprecated For migration purposes only, to be removed soon.
 */
export declare const ɵUSE_RUNTIME_DEPS_TRACKER_FOR_JIT = true;

export declare class ɵViewRef<T> implements EmbeddedViewRef<T>, ChangeDetectorRefInterface {
    /**
     * This represents the `LView` associated with the point where `ChangeDetectorRef` was
     * requested.
     *
     * This may be different from `_lView` if the `_cdRefInjectingView` is an embedded view.
     */
    private _cdRefInjectingView?;
    readonly notifyErrorHandler: boolean;
    private _appRef;
    private _attachedToViewContainer;
    get rootNodes(): any[];
    constructor(
    /**
     * This represents `LView` associated with the component when ViewRef is a ChangeDetectorRef.
     *
     * When ViewRef is created for a dynamic component, this also represents the `LView` for the
     * component.
     *
     * For a "regular" ViewRef created for an embedded view, this is the `LView` for the embedded
     * view.
     *
     * @internal
     */
    _lView: LView, 
    /**
     * This represents the `LView` associated with the point where `ChangeDetectorRef` was
     * requested.
     *
     * This may be different from `_lView` if the `_cdRefInjectingView` is an embedded view.
     */
    _cdRefInjectingView?: LView | undefined, notifyErrorHandler?: boolean);
    get context(): T;
    /**
     * Reports whether the given view is considered dirty according to the different marking mechanisms.
     */
    get dirty(): boolean;
    /**
     * @deprecated Replacing the full context object is not supported. Modify the context
     *   directly, or consider using a `Proxy` if you need to replace the full object.
     * // TODO(devversion): Remove this.
     */
    set context(value: T);
    get destroyed(): boolean;
    destroy(): void;
    onDestroy(callback: Function): void;
    /**
     * Marks a view and all of its ancestors dirty.
     *
     * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush} component is
     * checked when it needs to be re-rendered but the two normal triggers haven't marked it
     * dirty (i.e. inputs haven't changed and events haven't fired in the view).
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * @usageNotes
     * ### Example
     *
     * ```ts
     * @Component({
     *   selector: 'app-root',
     *   template: `Number of ticks: {{numberOfTicks}}`
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     * })
     * class AppComponent {
     *   numberOfTicks = 0;
     *
     *   constructor(private ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks++;
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     * ```
     */
    markForCheck(): void;
    markForRefresh(): void;
    /**
     * Detaches the view from the change detection tree.
     *
     * Detached views will not be checked during change detection runs until they are
     * re-attached, even if they are dirty. `detach` can be used in combination with
     * {@link ChangeDetectorRef#detectChanges} to implement local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```ts
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * @Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
     *   `,
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     * })
     * class App {
     * }
     * ```
     */
    detach(): void;
    /**
     * Re-attaches a view to the change detection tree.
     *
     * This can be used to re-attach views that were previously detached from the tree
     * using {@link ChangeDetectorRef#detach}. Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```ts
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * @Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: 'Data: {{dataProvider.data}}'
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
     *
     *   set live(value) {
     *     if (value) {
     *       this.ref.reattach();
     *     } else {
     *       this.ref.detach();
     *     }
     *   }
     * }
     *
     * @Component({
     *   selector: 'app-root',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     * })
     * class AppComponent {
     *   live = true;
     * }
     * ```
     */
    reattach(): void;
    /**
     * Checks the view and its children.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement
     * local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check every five seconds.
     *
     * See {@link ChangeDetectorRef#detach} for more information.
     */
    detectChanges(): void;
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't
     * introduce other changes.
     */
    checkNoChanges(): void;
    attachToViewContainerRef(): void;
    detachFromAppRef(): void;
    attachToAppRef(appRef: ApplicationRef): void;
}

/**
 * Returns a set of providers required to setup hydration support
 * for an application that is server side rendered. This function is
 * included into the `provideClientHydration` public API function from
 * the `platform-browser` package.
 *
 * The function sets up an internal flag that would be recognized during
 * the server side rendering time as well, so there is no need to
 * configure or change anything in NgUniversal to enable the feature.
 */
export declare function ɵwithDomHydration(): EnvironmentProviders;

/**
 * Returns a set of providers required to setup support for event replay.
 * Requires hydration to be enabled separately.
 */
export declare function ɵwithEventReplay(): Provider[];

/**
 * Returns a set of providers required to setup support for i18n hydration.
 * Requires hydration to be enabled separately.
 */
export declare function ɵwithI18nSupport(): Provider[];

/**
 * Returns a set of providers required to setup support for incremental hydration.
 * Requires hydration to be enabled separately.
 * Enabling incremental hydration also enables event replay for the entire app.
 *
 * @developerPreview
 */
export declare function ɵwithIncrementalHydration(): Provider[];

/**
 * Returns a writable type version of type.
 *
 * USAGE:
 * Given:
 * ```ts
 * interface Person {readonly name: string}
 * ```
 *
 * We would like to get a read/write version of `Person`.
 * ```ts
 * const WritablePerson = Writable<Person>;
 * ```
 *
 * The result is that you can do:
 *
 * ```ts
 * const readonlyPerson: Person = {name: 'Marry'};
 * readonlyPerson.name = 'John'; // TypeError
 * (readonlyPerson as WritablePerson).name = 'John'; // OK
 *
 * // Error: Correctly detects that `Person` did not have `age` property.
 * (readonlyPerson as WritablePerson).age = 30;
 * ```
 */
export declare type ɵWritable<T> = {
    -readonly [K in keyof T]: T[K];
};

/** Symbol used distinguish `WritableSignal` from other non-writable signals and functions. */
declare const ɵWRITABLE_SIGNAL: unique symbol;

/**
 * URL for the XSS security documentation.
 */
export declare const ɵXSS_SECURITY_URL = "https://g.co/ng/security#xss";

/** Token used to indicate if zoneless was enabled via provideZonelessChangeDetection(). */
export declare const ɵZONELESS_ENABLED: InjectionToken<boolean>;

/**
 * Advances to an element for later binding instructions.
 *
 * Used in conjunction with instructions like {@link property} to act on elements with specified
 * indices, for example those created with {@link element} or {@link elementStart}.
 *
 * ```ts
 * (rf: RenderFlags, ctx: any) => {
 *   if (rf & 1) {
 *     text(0, 'Hello');
 *     text(1, 'Goodbye')
 *     element(2, 'div');
 *   }
 *   if (rf & 2) {
 *     advance(2); // Advance twice to the <div>.
 *     property('title', 'test');
 *   }
 *  }
 * ```
 * @param delta Number of elements to advance forwards by.
 *
 * @codeGenApi
 */
export declare function ɵɵadvance(delta?: number): void;

/**
 * Sets the location within the source template at which
 * each element in the current view was defined.
 *
 * @param index Index at which the DOM node was created.
 * @param templatePath Path to the template at which the node was defined.
 * @param locations Element locations to which to attach the source location.
 *
 * @codeGenApi
 */
export declare function ɵɵattachSourceLocations(templatePath: string, locations: [index: number, offset: number, line: number, column: number][]): void;

/**
 * Updates the value of or removes a bound attribute on an Element.
 *
 * Used in the case of `[attr.title]="value"`
 *
 * @param name name The name of the attribute.
 * @param value value The attribute is removed when value is `null` or `undefined`.
 *                  Otherwise the attribute value is set to the stringified value.
 * @param sanitizer An optional function used to sanitize the value.
 * @param namespace Optional namespace to use when setting the attribute.
 *
 * @codeGenApi
 */
export declare function ɵɵattribute(name: string, value: any, sanitizer?: SanitizerFn | null, namespace?: string): typeof ɵɵattribute;

/**
 *
 * Update an interpolated attribute on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate1('title', 'prefix', v0, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolate1(attrName: string, prefix: string, v0: any, suffix: string, sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolate1;

/**
 *
 * Update an interpolated attribute on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate2('title', 'prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolate2(attrName: string, prefix: string, v0: any, i0: string, v1: any, suffix: string, sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolate2;

/**
 *
 * Update an interpolated attribute on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate3(
 * 'title', 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolate3(attrName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string, sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolate3;

/**
 *
 * Update an interpolated attribute on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate4(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolate4(attrName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string, sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolate4;

/**
 *
 * Update an interpolated attribute on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate5(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolate5(attrName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string, sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolate5;

/**
 *
 * Update an interpolated attribute on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate6(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolate6(attrName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string, sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolate6;

/**
 *
 * Update an interpolated attribute on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate7(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolate7(attrName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string, sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolate7;

/**
 *
 * Update an interpolated attribute on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div attr.title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolate8(
 *  'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 *
 * @param attrName The name of the attribute to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param i6 Static value used for concatenation only.
 * @param v7 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolate8(attrName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string, sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolate8;

/**
 * Update an interpolated attribute on an element with 9 or more bound values surrounded by text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div
 *  title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵattributeInterpolateV(
 *  'title', ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *
 * @param attrName The name of the attribute to update.
 * @param values The collection of values and the strings in-between those values, beginning with
 * a string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵattributeInterpolateV(attrName: string, values: any[], sanitizer?: SanitizerFn, namespace?: string): typeof ɵɵattributeInterpolateV;

/**
 * Update class bindings using an object literal or class-string on an element.
 *
 * This instruction is meant to apply styling via the `[class]="exp"` template bindings.
 * When classes are applied to the element they will then be updated with
 * respect to any styles/classes set via `classProp`. If any
 * classes are set to falsy then they will be removed from the element.
 *
 * Note that the styling instruction will not be applied until `stylingApply` is called.
 * Note that this will the provided classMap value to the host element if this function is called
 * within a host binding.
 *
 * @param classes A key/value map or string of CSS classes that will be added to the
 *        given element. Any missing classes (that have already been applied to the element
 *        beforehand) will be removed (unset) from the element's list of CSS classes.
 *
 * @codeGenApi
 */
export declare function ɵɵclassMap(classes: {
    [className: string]: boolean | undefined | null;
} | string | undefined | null): void;


/**
 *
 * Update an interpolated class on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div class="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolate1('prefix', v0, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolate1(prefix: string, v0: any, suffix: string): void;

/**
 *
 * Update an interpolated class on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div class="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolate2('prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolate2(prefix: string, v0: any, i0: string, v1: any, suffix: string): void;

/**
 *
 * Update an interpolated class on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div class="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolate3(
 * 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolate3(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string): void;

/**
 *
 * Update an interpolated class on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div class="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolate4(
 * 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolate4(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string): void;

/**
 *
 * Update an interpolated class on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div class="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolate5(
 * 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolate5(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string): void;

/**
 *
 * Update an interpolated class on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div class="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolate6(
 *    'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolate6(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string): void;

/**
 *
 * Update an interpolated class on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div class="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolate7(
 *    'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolate7(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string): void;

/**
 *
 * Update an interpolated class on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div class="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolate8(
 *  'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param i6 Static value used for concatenation only.
 * @param v7 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolate8(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string): void;

/**
 * Update an interpolated class on an element with 9 or more bound values surrounded by text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div
 *  class="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵclassMapInterpolateV(
 *  ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *.
 * @param values The collection of values and the strings in-between those values, beginning with
 * a string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @codeGenApi
 */
export declare function ɵɵclassMapInterpolateV(values: any[]): void;

/**
 * Update a class binding on an element with the provided value.
 *
 * This instruction is meant to handle the `[class.foo]="exp"` case and,
 * therefore, the class binding itself must already be allocated using
 * `styling` within the creation block.
 *
 * @param prop A valid CSS class (only one).
 * @param value A true/false value which will turn the class on or off.
 *
 * Note that this will apply the provided class value to the host element if this function
 * is called within a host binding function.
 *
 * @codeGenApi
 */
export declare function ɵɵclassProp(className: string, value: boolean | undefined | null): typeof ɵɵclassProp;

/**
 * @publicApi
 */
export declare type ɵɵComponentDeclaration<T, Selector extends String, ExportAs extends string[], InputMap extends {
    [key: string]: string | {
        alias: string | null;
        required: boolean;
    };
}, OutputMap extends {
    [key: string]: string;
}, QueryFields extends string[], NgContentSelectors extends string[], IsStandalone extends boolean = false, HostDirectives = never, IsSignal extends boolean = false> = unknown;

/**
 * Instruction that returns the component instance in which the current instruction is executing.
 * This is a constant-time version of `nextContent` for the case where we know that we need the
 * component instance specifically, rather than the context of a particular template.
 *
 * @codeGenApi
 */
export declare function ɵɵcomponentInstance(): unknown;

/**
 * The conditional instruction represents the basic building block on the runtime side to support
 * built-in "if" and "switch". On the high level this instruction is responsible for adding and
 * removing views selected by a conditional expression.
 *
 * @param matchingTemplateIndex Index of a template TNode representing a conditional view to be
 *     inserted; -1 represents a special case when there is no view to insert.
 * @param contextValue Value that should be exposed as the context of the conditional.
 * @codeGenApi
 */
export declare function ɵɵconditional<T>(matchingTemplateIndex: number, contextValue?: T): void;

/**
 * Registers a QueryList, associated with a content query, for later refresh (part of a view
 * refresh).
 *
 * @param directiveIndex Current directive index
 * @param predicate The type for which the query will search
 * @param flags Flags associated with the query
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export declare function ɵɵcontentQuery<T>(directiveIndex: number, predicate: ProviderToken<unknown> | string | string[], flags: QueryFlags, read?: any): void;

/**
 * Creates a new content query and binds it to a signal created by an authoring function.
 *
 * @param directiveIndex Current directive index
 * @param target The target signal to which the query should be bound
 * @param predicate The type for which the query will search
 * @param flags Flags associated with the query
 * @param read What to save in the query
 *
 * @codeGenApi
 */
export declare function ɵɵcontentQuerySignal<T>(directiveIndex: number, target: Signal<T>, predicate: ProviderToken<unknown> | string[], flags: QueryFlags, read?: any): void;

/**
 * Copies the fields not handled by the `ɵɵInheritDefinitionFeature` from the supertype of a
 * definition.
 *
 * This exists primarily to support ngcc migration of an existing View Engine pattern, where an
 * entire decorator is inherited from a parent to a child class. When ngcc detects this case, it
 * generates a skeleton definition on the child class, and applies this feature.
 *
 * The `ɵɵCopyDefinitionFeature` then copies any needed fields from the parent class' definition,
 * including things like the component template function.
 *
 * @param definition The definition of a child class which inherits from a parent class with its
 * own definition.
 *
 * @codeGenApi
 */
export declare function ɵɵCopyDefinitionFeature(definition: ɵDirectiveDef<any> | ɵComponentDef<any>): void;

/**
 * Declares an `@let` at a specific data slot. Returns itself to allow chaining.
 *
 * @param index Index at which to declare the `@let`.
 *
 * @codeGenApi
 */
export declare function ɵɵdeclareLet(index: number): typeof ɵɵdeclareLet;

/**
 * Creates runtime data structures for defer blocks.
 *
 * @param index Index of the `defer` instruction.
 * @param primaryTmplIndex Index of the template with the primary block content.
 * @param dependencyResolverFn Function that contains dependencies for this defer block.
 * @param loadingTmplIndex Index of the template with the loading block content.
 * @param placeholderTmplIndex Index of the template with the placeholder block content.
 * @param errorTmplIndex Index of the template with the error block content.
 * @param loadingConfigIndex Index in the constants array of the configuration of the loading.
 *     block.
 * @param placeholderConfigIndex Index in the constants array of the configuration of the
 *     placeholder block.
 * @param enableTimerScheduling Function that enables timer-related scheduling if `after`
 *     or `minimum` parameters are setup on the `@loading` or `@placeholder` blocks.
 * @param flags A set of flags to define a particular behavior (e.g. to indicate that
 *              hydrate triggers are present and regular triggers should be deactivated
 *              in certain scenarios).
 *
 * @codeGenApi
 */
export declare function ɵɵdefer(index: number, primaryTmplIndex: number, dependencyResolverFn?: DependencyResolverFn | null, loadingTmplIndex?: number | null, placeholderTmplIndex?: number | null, errorTmplIndex?: number | null, loadingConfigIndex?: number | null, placeholderConfigIndex?: number | null, enableTimerScheduling?: typeof ɵɵdeferEnableTimerScheduling, flags?: TDeferDetailsFlags | null): void;

/**
 * Enables timer-related scheduling if `after` or `minimum` parameters are setup
 * on the `@loading` or `@placeholder` blocks.
 */
export declare function ɵɵdeferEnableTimerScheduling(tView: TView, tDetails: TDeferBlockDetails, placeholderConfigIndex?: number | null, loadingConfigIndex?: number | null): void;

/**
 * Specifies that hydration never occurs.
 * @codeGenApi
 */
export declare function ɵɵdeferHydrateNever(): void;

/**
 * Creates runtime data structures for the `on hover` hydrate trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferHydrateOnHover(): void;

/**
 * Sets up logic to handle the `on idle` deferred trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferHydrateOnIdle(): void;

/**
 * Sets up logic to handle the `on immediate` hydrate trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferHydrateOnImmediate(): void;

/**
 * Creates runtime data structures for the `on interaction` hydrate trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferHydrateOnInteraction(): void;

/**
 * Creates runtime data structures for the `on timer` hydrate trigger.
 * @param delay Amount of time to wait before loading the content.
 * @codeGenApi
 */
export declare function ɵɵdeferHydrateOnTimer(delay: number): void;

/**
 * Creates runtime data structures for the `on viewport` hydrate trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferHydrateOnViewport(): void;

/**
 * Hydrates the deferred content when a value becomes truthy.
 * @codeGenApi
 */
export declare function ɵɵdeferHydrateWhen(rawValue: unknown): void;

/**
 * Creates runtime data structures for the `on hover` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferOnHover(triggerIndex: number, walkUpTimes?: number): void;

/**
 * Sets up logic to handle the `on idle` deferred trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferOnIdle(): void;

/**
 * Sets up logic to handle the `on immediate` deferred trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferOnImmediate(): void;

/**
 * Creates runtime data structures for the `on interaction` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferOnInteraction(triggerIndex: number, walkUpTimes?: number): void;

/**
 * Creates runtime data structures for the `on timer` deferred trigger.
 * @param delay Amount of time to wait before loading the content.
 * @codeGenApi
 */
export declare function ɵɵdeferOnTimer(delay: number): void;

/**
 * Creates runtime data structures for the `on viewport` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferOnViewport(triggerIndex: number, walkUpTimes?: number): void;

/**
 * Creates runtime data structures for the `prefetch on hover` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferPrefetchOnHover(triggerIndex: number, walkUpTimes?: number): void;

/**
 * Sets up logic to handle the `prefetch on idle` deferred trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferPrefetchOnIdle(): void;

/**
 * Sets up logic to handle the `prefetch on immediate` deferred trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferPrefetchOnImmediate(): void;

/**
 * Creates runtime data structures for the `prefetch on interaction` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferPrefetchOnInteraction(triggerIndex: number, walkUpTimes?: number): void;

/**
 * Creates runtime data structures for the `prefetch on timer` deferred trigger.
 * @param delay Amount of time to wait before prefetching the content.
 * @codeGenApi
 */
export declare function ɵɵdeferPrefetchOnTimer(delay: number): void;

/**
 * Creates runtime data structures for the `prefetch on viewport` deferred trigger.
 * @param triggerIndex Index at which to find the trigger element.
 * @param walkUpTimes Number of times to walk up/down the tree hierarchy to find the trigger.
 * @codeGenApi
 */
export declare function ɵɵdeferPrefetchOnViewport(triggerIndex: number, walkUpTimes?: number): void;

/**
 * Prefetches the deferred content when a value becomes truthy.
 * @codeGenApi
 */
export declare function ɵɵdeferPrefetchWhen(rawValue: unknown): void;

/**
 * Loads defer block dependencies when a trigger value becomes truthy.
 * @codeGenApi
 */
export declare function ɵɵdeferWhen(rawValue: unknown): void;

/**
 * Create a component definition object.
 *
 *
 * # Example
 * ```ts
 * class MyComponent {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ɵcmp = defineComponent({
 *     ...
 *   });
 * }
 * ```
 * @codeGenApi
 */
export declare function ɵɵdefineComponent<T>(componentDefinition: ComponentDefinition<T>): ɵComponentDef<any>;

/**
 * Create a directive definition object.
 *
 * # Example
 * ```ts
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ɵdir = ɵɵdefineDirective({
 *     ...
 *   });
 * }
 * ```
 *
 * @codeGenApi
 */
export declare function ɵɵdefineDirective<T>(directiveDefinition: DirectiveDefinition<T>): ɵDirectiveDef<any>;

/**
 * Construct an injectable definition which defines how a token will be constructed by the DI
 * system, and in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ɵprov` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call [`inject`](api/core/inject) to access the `Injector` and request injection
 * of dependencies.
 *
 * @codeGenApi
 * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
 */
export declare function ɵɵdefineInjectable<T>(opts: {
    token: unknown;
    providedIn?: Type<any> | 'root' | 'platform' | 'any' | 'environment' | null;
    factory: () => T;
}): unknown;

/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has a `ɵprov` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @codeGenApi
 */
export declare function ɵɵdefineInjector(options: {
    providers?: any[];
    imports?: any[];
}): unknown;

/**
 * @codeGenApi
 */
export declare function ɵɵdefineNgModule<T>(def: {
    /** Token representing the module. Used by DI. */
    type: T;
    /** List of components to bootstrap. */
    bootstrap?: Type<any>[] | (() => Type<any>[]);
    /** List of components, directives, and pipes declared by this module. */
    declarations?: Type<any>[] | (() => Type<any>[]);
    /** List of modules or `ModuleWithProviders` imported by this module. */
    imports?: Type<any>[] | (() => Type<any>[]);
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     */
    exports?: Type<any>[] | (() => Type<any>[]);
    /** The set of schemas that declare elements to be allowed in the NgModule. */
    schemas?: SchemaMetadata[] | null;
    /** Unique ID for the module that is used with `getModuleFactory`. */
    id?: string | null;
}): unknown;

/**
 * Create a pipe definition object.
 *
 * # Example
 * ```ts
 * class MyPipe implements PipeTransform {
 *   // Generated by Angular Template Compiler
 *   static ɵpipe = definePipe({
 *     ...
 *   });
 * }
 * ```
 * @param pipeDef Pipe definition generated by the compiler
 *
 * @codeGenApi
 */
export declare function ɵɵdefinePipe<T>(pipeDef: {
    /** Name of the pipe. Used for matching pipes in template to pipe defs. */
    name: string;
    /** Pipe class reference. Needed to extract pipe lifecycle hooks. */
    type: Type<T>;
    /** Whether the pipe is pure. */
    pure?: boolean;
    /**
     * Whether the pipe is standalone.
     */
    standalone?: boolean;
}): unknown;


/**
 * @publicApi
 */
export declare type ɵɵDirectiveDeclaration<T, Selector extends string, ExportAs extends string[], InputMap extends {
    [key: string]: string | {
        alias: string | null;
        required: boolean;
        isSignal?: boolean;
    };
}, OutputMap extends {
    [key: string]: string;
}, QueryFields extends string[], NgContentSelectors extends never = never, IsStandalone extends boolean = false, HostDirectives = never, IsSignal extends boolean = false> = unknown;

/**
 * Returns the value associated to the given token from the injectors.
 *
 * `directiveInject` is intended to be used for directive, component and pipe factories.
 *  All other injection use `inject` which does not walk the node injector tree.
 *
 * Usage example (in factory function):
 *
 * ```ts
 * class SomeDirective {
 *   constructor(directive: DirectiveA) {}
 *
 *   static ɵdir = ɵɵdefineDirective({
 *     type: SomeDirective,
 *     factory: () => new SomeDirective(ɵɵdirectiveInject(DirectiveA))
 *   });
 * }
 * ```
 * @param token the type or token to inject
 * @param flags Injection flags
 * @returns the value from the injector or `null` when not found
 *
 * @codeGenApi
 */
export declare function ɵɵdirectiveInject<T>(token: ProviderToken<T>): T;

export declare function ɵɵdirectiveInject<T>(token: ProviderToken<T>, flags: InjectFlags): T;

/**
 * Disables directive matching on element.
 *
 *  * Example:
 * ```html
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ɵɵdisableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ɵɵenableBindings() -->
 * </div>
 * ```
 *
 * @codeGenApi
 */
export declare function ɵɵdisableBindings(): void;

/**
 * Creates an empty element using {@link elementStart} and {@link elementEnd}
 *
 * @param index Index of the element in the data array
 * @param name Name of the DOM Node
 * @param attrsIndex Index of the element's attributes in the `consts` array.
 * @param localRefsIndex Index of the element's local references in the `consts` array.
 * @returns This function returns itself so that it may be chained.
 *
 * @codeGenApi
 */
export declare function ɵɵelement(index: number, name: string, attrsIndex?: number | null, localRefsIndex?: number): typeof ɵɵelement;

/**
 * Creates an empty logical container using {@link elementContainerStart}
 * and {@link elementContainerEnd}
 *
 * @param index Index of the element in the LView array
 * @param attrsIndex Index of the container attributes in the `consts` array.
 * @param localRefsIndex Index of the container's local references in the `consts` array.
 * @returns This function returns itself so that it may be chained.
 *
 * @codeGenApi
 */
export declare function ɵɵelementContainer(index: number, attrsIndex?: number | null, localRefsIndex?: number): typeof ɵɵelementContainer;

/**
 * Mark the end of the <ng-container>.
 * @returns This function returns itself so that it may be chained.
 *
 * @codeGenApi
 */
export declare function ɵɵelementContainerEnd(): typeof ɵɵelementContainerEnd;

/**
 * Creates a logical container for other nodes (<ng-container>) backed by a comment node in the DOM.
 * The instruction must later be followed by `elementContainerEnd()` call.
 *
 * @param index Index of the element in the LView array
 * @param attrsIndex Index of the container attributes in the `consts` array.
 * @param localRefsIndex Index of the container's local references in the `consts` array.
 * @returns This function returns itself so that it may be chained.
 *
 * Even if this instruction accepts a set of attributes no actual attribute values are propagated to
 * the DOM (as a comment node can't have attributes). Attributes are here only for directive
 * matching purposes and setting initial inputs of directives.
 *
 * @codeGenApi
 */
export declare function ɵɵelementContainerStart(index: number, attrsIndex?: number | null, localRefsIndex?: number): typeof ɵɵelementContainerStart;

/**
 * Mark the end of the element.
 * @returns This function returns itself so that it may be chained.
 *
 * @codeGenApi
 */
export declare function ɵɵelementEnd(): typeof ɵɵelementEnd;


/**
 * Create DOM element. The instruction must later be followed by `elementEnd()` call.
 *
 * @param index Index of the element in the LView array
 * @param name Name of the DOM Node
 * @param attrsIndex Index of the element's attributes in the `consts` array.
 * @param localRefsIndex Index of the element's local references in the `consts` array.
 * @returns This function returns itself so that it may be chained.
 *
 * Attributes and localRefs are passed as an array of strings where elements with an even index
 * hold an attribute name and elements with an odd index hold an attribute value, ex.:
 * ['id', 'warning5', 'class', 'alert']
 *
 * @codeGenApi
 */
export declare function ɵɵelementStart(index: number, name: string, attrsIndex?: number | null, localRefsIndex?: number): typeof ɵɵelementStart;

/**
 * Enables directive matching on elements.
 *
 *  * Example:
 * ```html
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ɵɵdisableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ɵɵenableBindings() -->
 * </div>
 * ```
 *
 * @codeGenApi
 */
export declare function ɵɵenableBindings(): void;

/**
 * A feature that adds support for external runtime styles for a component.
 * An external runtime style is a URL to a CSS stylesheet that contains the styles
 * for a given component. For browsers, this URL will be used in an appended `link` element
 * when the component is rendered. This feature is typically used for Hot Module Replacement
 * (HMR) of component stylesheets by leveraging preexisting global stylesheet HMR available
 * in most development servers.
 *
 * @codeGenApi
 */
export declare function ɵɵExternalStylesFeature(styleUrls: string[]): ComponentDefFeature;

/**
 * @publicApi
 */
export declare type ɵɵFactoryDeclaration<T, CtorDependencies extends CtorDependency[]> = unknown;

export declare enum ɵɵFactoryTarget {
    Directive = 0,
    Component = 1,
    Injectable = 2,
    Pipe = 3,
    NgModule = 4
}

export declare function ɵɵgetComponentDepsFactory(type: ɵComponentType<any>, rawImports?: RawScopeInfoFromDecorator[]): () => DependencyTypeList;

/**
 * Returns the current OpaqueViewState instance.
 *
 * Used in conjunction with the restoreView() instruction to save a snapshot
 * of the current view and restore it when listeners are invoked. This allows
 * walking the declaration view tree in listeners to get vars from parent views.
 *
 * @codeGenApi
 */
export declare function ɵɵgetCurrentView(): OpaqueViewState;

/**
 * @codeGenApi
 */
export declare function ɵɵgetInheritedFactory<T>(type: Type<any>): (type: Type<T>) => T;

/**
 * This feature adds the host directives behavior to a directive definition by patching a
 * function onto it. The expectation is that the runtime will invoke the function during
 * directive matching.
 *
 * For example:
 * ```ts
 * class ComponentWithHostDirective {
 *   static ɵcmp = defineComponent({
 *    type: ComponentWithHostDirective,
 *    features: [ɵɵHostDirectivesFeature([
 *      SimpleHostDirective,
 *      {directive: AdvancedHostDirective, inputs: ['foo: alias'], outputs: ['bar']},
 *    ])]
 *  });
 * }
 * ```
 *
 * @codeGenApi
 */
export declare function ɵɵHostDirectivesFeature(rawHostDirectives: HostDirectiveConfig[] | (() => HostDirectiveConfig[])): DirectiveDefFeature;

/**
 * Update a property on a host element. Only applies to native node properties, not inputs.
 *
 * Operates on the element selected by index via the {@link select} instruction.
 *
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @returns This function returns itself so that it may be chained
 * (e.g. `property('name', ctx.name)('title', ctx.title)`)
 *
 * @codeGenApi
 */
export declare function ɵɵhostProperty<T>(propName: string, value: T, sanitizer?: SanitizerFn | null): typeof ɵɵhostProperty;

/**
 *
 * Use this instruction to create a translation block that doesn't contain any placeholder.
 * It calls both {@link i18nStart} and {@link i18nEnd} in one instruction.
 *
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `�{index}(:{block})�`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `�#{index}(:{block})�`/`�/#{index}(:{block})�`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `�*{index}:{block}�`/`�/*{index}:{block}�`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param messageIndex An index of the translation message from the `def.consts` array.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
export declare function ɵɵi18n(index: number, messageIndex: number, subTemplateIndex?: number): void;

/**
 * Updates a translation block or an i18n attribute when the bindings have changed.
 *
 * @param index Index of either {@link i18nStart} (translation block) or {@link i18nAttributes}
 * (i18n attribute) on which it should update the content.
 *
 * @codeGenApi
 */
export declare function ɵɵi18nApply(index: number): void;

/**
 * Marks a list of attributes as translatable.
 *
 * @param index A unique index in the static block
 * @param values
 *
 * @codeGenApi
 */
export declare function ɵɵi18nAttributes(index: number, attrsIndex: number): void;

/**
 * Translates a translation block marked by `i18nStart` and `i18nEnd`. It inserts the text/ICU nodes
 * into the render tree, moves the placeholder nodes and removes the deleted nodes.
 *
 * @codeGenApi
 */
export declare function ɵɵi18nEnd(): void;

/**
 * Stores the values of the bindings during each update cycle in order to determine if we need to
 * update the translated nodes.
 *
 * @param value The binding's value
 * @returns This function returns itself so that it may be chained
 * (e.g. `i18nExp(ctx.name)(ctx.title)`)
 *
 * @codeGenApi
 */
export declare function ɵɵi18nExp<T>(value: T): typeof ɵɵi18nExp;

/**
 * Handles message string post-processing for internationalization.
 *
 * Handles message string post-processing by transforming it from intermediate
 * format (that might contain some markers that we need to replace) to the final
 * form, consumable by i18nStart instruction. Post processing steps include:
 *
 * 1. Resolve all multi-value cases (like [�*1:1��#2:1�|�#4:1�|�5�])
 * 2. Replace all ICU vars (like "VAR_PLURAL")
 * 3. Replace all placeholders used inside ICUs in a form of {PLACEHOLDER}
 * 4. Replace all ICU references with corresponding values (like �ICU_EXP_ICU_1�)
 *    in case multiple ICUs have the same placeholder name
 *
 * @param message Raw translation string for post processing
 * @param replacements Set of replacements that should be applied
 *
 * @returns Transformed string that can be consumed by i18nStart instruction
 *
 * @codeGenApi
 */
export declare function ɵɵi18nPostprocess(message: string, replacements?: {
    [key: string]: string | string[];
}): string;

/**
 * Marks a block of text as translatable.
 *
 * The instructions `i18nStart` and `i18nEnd` mark the translation block in the template.
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `�{index}(:{block})�`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `�#{index}(:{block})�`/`�/#{index}(:{block})�`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `�*{index}:{block}�`/`�/*{index}:{block}�`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param messageIndex An index of the translation message from the `def.consts` array.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
export declare function ɵɵi18nStart(index: number, messageIndex: number, subTemplateIndex?: number): void;

/**
 * Merges the definition from a super class to a sub class.
 * @param definition The definition that is a SubClass of another directive of component
 *
 * @codeGenApi
 */
export declare function ɵɵInheritDefinitionFeature(definition: ɵDirectiveDef<any> | ɵComponentDef<any>): void;

/**
 * Generated instruction: injects a token from the currently active injector.
 *
 * (Additional documentation moved to `inject`, as it is the public API, and an alias for this
 * instruction)
 *
 * @see inject
 * @codeGenApi
 * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
 */
export declare function ɵɵinject<T>(token: ProviderToken<T>): T;

export declare function ɵɵinject<T>(token: ProviderToken<T>, flags?: InjectFlags): T | null;

export declare function ɵɵinject(token: HostAttributeToken): string;

export declare function ɵɵinject(token: HostAttributeToken, flags?: InjectFlags): string | null;

export declare function ɵɵinject<T>(token: ProviderToken<T> | HostAttributeToken, flags?: InjectFlags): string | null;

/**
 * Information about how a type or `InjectionToken` interfaces with the DI system.
 *
 * At a minimum, this includes a `factory` which defines how to create the given type `T`, possibly
 * requesting injection of other types if necessary.
 *
 * Optionally, a `providedIn` parameter specifies that the given type belongs to a particular
 * `Injector`, `NgModule`, or a special scope (e.g. `'root'`). A value of `null` indicates
 * that the injectable does not belong to any scope.
 *
 * @codeGenApi
 * @publicApi The ViewEngine compiler emits code with this type for injectables. This code is
 *   deployed to npm, and should be treated as public api.

 */
export declare interface ɵɵInjectableDeclaration<T> {
    /**
     * Specifies that the given type belongs to a particular injector:
     * - `InjectorType` such as `NgModule`,
     * - `'root'` the root injector
     * - `'any'` all injectors.
     * - `null`, does not belong to any injector. Must be explicitly listed in the injector
     *   `providers`.
     */
    providedIn: InjectorType<any> | 'root' | 'platform' | 'any' | 'environment' | null;
    /**
     * The token to which this definition belongs.
     *
     * Note that this may not be the same as the type that the `factory` will create.
     */
    token: unknown;
    /**
     * Factory method to execute to create an instance of the injectable.
     */
    factory: (t?: Type<any>) => T;
    /**
     * In a case of no explicit injector, a location where the instance of the injectable is stored.
     */
    value: T | undefined;
}

/**
 * Facade for the attribute injection from DI.
 *
 * @codeGenApi
 */
export declare function ɵɵinjectAttribute(attrNameToInject: string): string | null;

/**
 * @publicApi
 */
export declare type ɵɵInjectorDeclaration<T> = unknown;

/**
 * Information about the providers to be included in an `Injector` as well as how the given type
 * which carries the information should be created by the DI system.
 *
 * An `InjectorDef` can import other types which have `InjectorDefs`, forming a deep nested
 * structure of providers with a defined priority (identically to how `NgModule`s also have
 * an import/dependency structure).
 *
 * NOTE: This is a private type and should not be exported
 *
 * @codeGenApi
 */
export declare interface ɵɵInjectorDef<T> {
    providers: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | EnvironmentProviders | any[])[];
    imports: (InjectorType<any> | InjectorTypeWithProviders<any>)[];
}

/**
 * Decorates the directive definition with support for input transform functions.
 *
 * If the directive uses inheritance, the feature should be included before the
 * `InheritDefinitionFeature` to ensure that the `inputTransforms` field is populated.
 *
 * @codeGenApi
 */
export declare function ɵɵInputTransformsFeature<T>(definition: ɵDirectiveDef<T>): void;

/**
 * Throws an error indicating that a factory function could not be generated by the compiler for a
 * particular class.
 *
 * This instruction allows the actual error message to be optimized away when ngDevMode is turned
 * off, saving bytes of generated code while still providing a good experience in dev mode.
 *
 * The name of the class is not mentioned here, but will be in the generated factory function name
 * and thus in the stack trace.
 *
 * @codeGenApi
 */
export declare function ɵɵinvalidFactory(): never;

/**
 * Throws an error indicating that a factory function could not be generated by the compiler for a
 * particular class.
 *
 * The name of the class is not mentioned here, but will be in the generated factory function name
 * and thus in the stack trace.
 *
 * @codeGenApi
 */
export declare function ɵɵinvalidFactoryDep(index: number): never;

/**
 * Adds an event listener to the current node.
 *
 * If an output exists on one of the node's directives, it also subscribes to the output
 * and saves the subscription for later cleanup.
 *
 * @param eventName Name of the event
 * @param listenerFn The function to be called when event emits
 * @param useCapture Whether or not to use capture in event listener - this argument is a reminder
 *     from the Renderer3 infrastructure and should be removed from the instruction arguments
 * @param eventTargetResolver Function that returns global target information in case this listener
 * should be attached to a global object like window, document or body
 *
 * @codeGenApi
 */
export declare function ɵɵlistener(eventName: string, listenerFn: (e?: any) => any, useCapture?: boolean, eventTargetResolver?: GlobalTargetResolver): typeof ɵɵlistener;

/**
 * Loads a QueryList corresponding to the current view or content query.
 *
 * @codeGenApi
 */
export declare function ɵɵloadQuery<T>(): QueryList<T>;

/**
 * Sets the namespace used to create elements to `null`, which forces element creation to use
 * `createElement` rather than `createElementNS`.
 *
 * @codeGenApi
 */
export declare function ɵɵnamespaceHTML(): void;

/**
 * Sets the namespace used to create elements to `'http://www.w3.org/1998/MathML/'` in global state.
 *
 * @codeGenApi
 */
export declare function ɵɵnamespaceMathML(): void;

/**
 * Sets the namespace used to create elements to `'http://www.w3.org/2000/svg'` in global state.
 *
 * @codeGenApi
 */
export declare function ɵɵnamespaceSVG(): void;

/**
 * Retrieves a context at the level specified and saves it as the global, contextViewData.
 * Will get the next level up if level is not specified.
 *
 * This is used to save contexts of parent views so they can be bound in embedded views, or
 * in conjunction with reference() to bind a ref from a parent view.
 *
 * @param level The relative level of the view from which to grab context compared to contextVewData
 * @returns context
 *
 * @codeGenApi
 */
export declare function ɵɵnextContext<T = any>(level?: number): T;

/**
 * Evaluates the class metadata declaration.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclareClassMetadata(decl: {
    type: Type<any>;
    decorators: any[];
    ctorParameters?: () => any[];
    propDecorators?: {
        [field: string]: any;
    };
}): void;

/**
 * Evaluates the class metadata of a component that contains deferred blocks.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclareClassMetadataAsync(decl: {
    type: Type<any>;
    resolveDeferredDeps: () => Promise<Type<unknown>>[];
    resolveMetadata: (...types: Type<unknown>[]) => {
        decorators: any[];
        ctorParameters: (() => any[]) | null;
        propDecorators: {
            [field: string]: any;
        } | null;
    };
}): void;

/**
 * Compiles a partial component declaration object into a full component definition object.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclareComponent(decl: R3DeclareComponentFacade): unknown;

/**
 * Compiles a partial directive declaration object into a full directive definition object.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclareDirective(decl: R3DeclareDirectiveFacade): unknown;

/**
 * Compiles a partial pipe declaration object into a full pipe definition object.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclareFactory(decl: R3DeclareFactoryFacade): unknown;

/**
 * Compiles a partial injectable declaration object into a full injectable definition object.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclareInjectable(decl: R3DeclareInjectableFacade): unknown;

/**
 * Compiles a partial injector declaration object into a full injector definition object.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclareInjector(decl: R3DeclareInjectorFacade): unknown;

/**
 * Compiles a partial NgModule declaration object into a full NgModule definition object.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclareNgModule(decl: R3DeclareNgModuleFacade): unknown;

/**
 * Compiles a partial pipe declaration object into a full pipe definition object.
 *
 * @codeGenApi
 */
export declare function ɵɵngDeclarePipe(decl: R3DeclarePipeFacade): unknown;

/**
 * @publicApi
 */
export declare type ɵɵNgModuleDeclaration<T, Declarations, Imports, Exports> = unknown;

/**
 * The NgOnChangesFeature decorates a component with support for the ngOnChanges
 * lifecycle hook, so it should be included in any component that implements
 * that hook.
 *
 * If the component or directive uses inheritance, the NgOnChangesFeature MUST
 * be included as a feature AFTER {@link InheritDefinitionFeature}, otherwise
 * inherited properties will not be propagated to the ngOnChanges lifecycle
 * hook.
 *
 * Example usage:
 *
 * ```ts
 * static ɵcmp = defineComponent({
 *   ...
 *   inputs: {name: 'publicName'},
 *   features: [NgOnChangesFeature]
 * });
 * ```
 *
 * @codeGenApi
 */
export declare const ɵɵNgOnChangesFeature: () => DirectiveDefFeature;


/**
 * Create a pipe.
 *
 * @param index Pipe index where the pipe will be stored.
 * @param pipeName The name of the pipe
 * @returns T the instance of the pipe.
 *
 * @codeGenApi
 */
export declare function ɵɵpipe(index: number, pipeName: string): any;

/**
 * Invokes a pipe with 1 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param offset the binding offset
 * @param v1 1st argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export declare function ɵɵpipeBind1(index: number, offset: number, v1: any): any;

/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export declare function ɵɵpipeBind2(index: number, slotOffset: number, v1: any, v2: any): any;

/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 4rd argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export declare function ɵɵpipeBind3(index: number, slotOffset: number, v1: any, v2: any, v3: any): any;

/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 3rd argument to {@link PipeTransform#transform}.
 * @param v4 4th argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export declare function ɵɵpipeBind4(index: number, slotOffset: number, v1: any, v2: any, v3: any, v4: any): any;

/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param values Array of arguments to pass to {@link PipeTransform#transform} method.
 *
 * @codeGenApi
 */
export declare function ɵɵpipeBindV(index: number, slotOffset: number, values: [any, ...any[]]): any;

/**
 * @publicApi
 */
export declare type ɵɵPipeDeclaration<T, Name extends string, IsStandalone extends boolean = false> = unknown;

/**
 * Inserts previously re-distributed projected nodes. This instruction must be preceded by a call
 * to the projectionDef instruction.
 *
 * @param nodeIndex Index of the projection node.
 * @param selectorIndex Index of the slot selector.
 *  - 0 when the selector is `*` (or unspecified as this is the default value),
 *  - 1 based index of the selector from the {@link projectionDef}
 * @param attrs Static attributes set on the `ng-content` node.
 * @param fallbackTemplateFn Template function with fallback content.
 *   Will be rendered if the slot is empty at runtime.
 * @param fallbackDecls Number of declarations in the fallback template.
 * @param fallbackVars Number of variables in the fallback template.
 *
 * @codeGenApi
 */
export declare function ɵɵprojection(nodeIndex: number, selectorIndex?: number, attrs?: TAttributes, fallbackTemplateFn?: ComponentTemplate<unknown>, fallbackDecls?: number, fallbackVars?: number): void;

/**
 * Instruction to distribute projectable nodes among <ng-content> occurrences in a given template.
 * It takes all the selectors from the entire component's template and decides where
 * each projected node belongs (it re-distributes nodes among "buckets" where each "bucket" is
 * backed by a selector).
 *
 * This function requires CSS selectors to be provided in 2 forms: parsed (by a compiler) and text,
 * un-parsed form.
 *
 * The parsed form is needed for efficient matching of a node against a given CSS selector.
 * The un-parsed, textual form is needed for support of the ngProjectAs attribute.
 *
 * Having a CSS selector in 2 different formats is not ideal, but alternatives have even more
 * drawbacks:
 * - having only a textual form would require runtime parsing of CSS selectors;
 * - we can't have only a parsed as we can't re-construct textual form from it (as entered by a
 * template author).
 *
 * @param projectionSlots? A collection of projection slots. A projection slot can be based
 *        on a parsed CSS selectors or set to the wildcard selector ("*") in order to match
 *        all nodes which do not match any selector. If not specified, a single wildcard
 *        selector projection slot will be defined.
 *
 * @codeGenApi
 */
export declare function ɵɵprojectionDef(projectionSlots?: ProjectionSlots): void;

/**
 * Update a property on a selected element.
 *
 * Operates on the element selected by index via the {@link select} instruction.
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled
 *
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @returns This function returns itself so that it may be chained
 * (e.g. `property('name', ctx.name)('title', ctx.title)`)
 *
 * @codeGenApi
 */
export declare function ɵɵproperty<T>(propName: string, value: T, sanitizer?: SanitizerFn | null): typeof ɵɵproperty;

/**
 *
 * Update an interpolated property on an element with a lone bound value
 *
 * Used when the value passed to a property has 1 interpolated value in it, an no additional text
 * surrounds that interpolated value:
 *
 * ```html
 * <div title="{{v0}}"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate('title', v0);
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate(propName: string, v0: any, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate;

/**
 *
 * Update an interpolated property on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div title="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate1('title', 'prefix', v0, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate1(propName: string, prefix: string, v0: any, suffix: string, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate1;

/**
 *
 * Update an interpolated property on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate2('title', 'prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate2(propName: string, prefix: string, v0: any, i0: string, v1: any, suffix: string, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate2;

/**
 *
 * Update an interpolated property on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate3(
 * 'title', 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate3(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate3;

/**
 *
 * Update an interpolated property on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate4(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate4(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate4;

/**
 *
 * Update an interpolated property on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate5(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate5(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate5;

/**
 *
 * Update an interpolated property on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate6(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate6(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate6;

/**
 *
 * Update an interpolated property on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate7(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate7(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate7;

/**
 *
 * Update an interpolated property on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolate8(
 *  'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param i6 Static value used for concatenation only.
 * @param v7 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolate8(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string, sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolate8;

/**
 * Update an interpolated property on an element with 9 or more bound values surrounded by text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div
 *  title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ɵɵpropertyInterpolateV(
 *  'title', ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update.
 * @param values The collection of values and the strings in between those values, beginning with a
 * string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵpropertyInterpolateV(propName: string, values: any[], sanitizer?: SanitizerFn): typeof ɵɵpropertyInterpolateV;

/**
 * This feature resolves the providers of a directive (or component),
 * and publish them into the DI system, making it visible to others for injection.
 *
 * For example:
 * ```ts
 * class ComponentWithProviders {
 *   constructor(private greeter: GreeterDE) {}
 *
 *   static ɵcmp = defineComponent({
 *     type: ComponentWithProviders,
 *     selectors: [['component-with-providers']],
 *    factory: () => new ComponentWithProviders(directiveInject(GreeterDE as any)),
 *    decls: 1,
 *    vars: 1,
 *    template: function(fs: RenderFlags, ctx: ComponentWithProviders) {
 *      if (fs & RenderFlags.Create) {
 *        ɵɵtext(0);
 *      }
 *      if (fs & RenderFlags.Update) {
 *        ɵɵtextInterpolate(ctx.greeter.greet());
 *      }
 *    },
 *    features: [ɵɵProvidersFeature([GreeterDE])]
 *  });
 * }
 * ```
 *
 * @param definition
 *
 * @codeGenApi
 */
export declare function ɵɵProvidersFeature<T>(providers: Provider[], viewProviders?: Provider[]): (definition: ɵDirectiveDef<T>) => void;

/**
 * Bindings for pure functions are stored after regular bindings.
 *
 * |-------decls------|---------vars---------|                 |----- hostVars (dir1) ------|
 * ------------------------------------------------------------------------------------------
 * | nodes/refs/pipes | bindings | fn slots  | injector | dir1 | host bindings | host slots |
 * ------------------------------------------------------------------------------------------
 *                    ^                      ^
 *      TView.bindingStartIndex      TView.expandoStartIndex
 *
 * Pure function instructions are given an offset from the binding root. Adding the offset to the
 * binding root gives the first index where the bindings are stored. In component views, the binding
 * root is the bindingStartIndex. In host bindings, the binding root is the expandoStartIndex +
 * any directive instances + any hostVars in directives evaluated before it.
 *
 * See VIEW_DATA.md for more information about host binding resolution.
 */
/**
 * If the value hasn't been saved, calls the pure function to store and return the
 * value. If it has been saved, returns the saved value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns a value
 * @param thisArg Optional calling context of pureFn
 * @returns value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction0<T>(slotOffset: number, pureFn: () => T, thisArg?: any): T;

/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns an updated value
 * @param exp Updated expression value
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction1(slotOffset: number, pureFn: (v: any) => any, exp: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction2(slotOffset: number, pureFn: (v1: any, v2: any) => any, exp1: any, exp2: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction3(slotOffset: number, pureFn: (v1: any, v2: any, v3: any) => any, exp1: any, exp2: any, exp3: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction4(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction5(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any, v5: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, exp5: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction6(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any, v5: any, v6: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, exp5: any, exp6: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param exp7
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction7(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, v7: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, exp5: any, exp6: any, exp7: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param exp7
 * @param exp8
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunction8(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, v7: any, v8: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, exp5: any, exp6: any, exp7: any, exp8: any, thisArg?: any): any;

/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param exps An array of binding values
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ɵɵpureFunctionV(slotOffset: number, pureFn: (...v: any[]) => any, exps: any[], thisArg?: any): any;

/**
 * Advances the current query index by a specified offset.
 *
 * Adjusting the current query index is necessary in cases where a given directive has a mix of
 * zone-based and signal-based queries. The signal-based queries don't require tracking of the
 * current index (those are refreshed on demand and not during change detection) so this instruction
 * is only necessary for backward-compatibility.
 *
 * @param index offset to apply to the current query index (defaults to 1)
 *
 * @codeGenApi
 */
export declare function ɵɵqueryAdvance(indexOffset?: number): void;

/**
 * Refreshes a query by combining matches from all active views and removing matches from deleted
 * views.
 *
 * @returns `true` if a query got dirty during change detection or if this is a static query
 * resolving in creation mode, `false` otherwise.
 *
 * @codeGenApi
 */
export declare function ɵɵqueryRefresh(queryList: QueryList<any>): boolean;

/**
 * Retrieves the value of a `@let` declaration defined in a parent view.
 *
 * @param index Index of the declaration within the view.
 *
 * @codeGenApi
 */
export declare function ɵɵreadContextLet<T>(index: number): T;

/**
 * Retrieves a local reference from the current contextViewData.
 *
 * If the reference to retrieve is in a parent view, this instruction is used in conjunction
 * with a nextContext() call, which walks up the tree and updates the contextViewData instance.
 *
 * @param index The index of the local ref in contextViewData.
 *
 * @codeGenApi
 */
export declare function ɵɵreference<T>(index: number): T;

/**
 * Adds the given NgModule type to Angular's NgModule registry.
 *
 * This is generated as a side-effect of NgModule compilation. Note that the `id` is passed in
 * explicitly and not read from the NgModule definition. This is for two reasons: it avoids a
 * megamorphic read, and in JIT there's a chicken-and-egg problem where the NgModule may not be
 * fully resolved when it's registered.
 *
 * @codeGenApi
 */
export declare function ɵɵregisterNgModuleType(ngModuleType: ɵNgModuleType, id: string): void;

/**
 * The repeater instruction does update-time diffing of a provided collection (against the
 * collection seen previously) and maps changes in the collection to views structure (by adding,
 * removing or moving views as needed).
 * @param collection - the collection instance to be checked for changes
 * @codeGenApi
 */
export declare function ɵɵrepeater(collection: Iterable<unknown> | undefined | null): void;

/**
 * The repeaterCreate instruction runs in the creation part of the template pass and initializes
 * internal data structures required by the update pass of the built-in repeater logic. Repeater
 * metadata are allocated in the data part of LView with the following layout:
 * - LView[HEADER_OFFSET + index] - metadata
 * - LView[HEADER_OFFSET + index + 1] - reference to a template function rendering an item
 * - LView[HEADER_OFFSET + index + 2] - optional reference to a template function rendering an empty
 * block
 *
 * @param index Index at which to store the metadata of the repeater.
 * @param templateFn Reference to the template of the main repeater block.
 * @param decls The number of nodes, local refs, and pipes for the main block.
 * @param vars The number of bindings for the main block.
 * @param tagName The name of the container element, if applicable
 * @param attrsIndex Index of template attributes in the `consts` array.
 * @param trackByFn Reference to the tracking function.
 * @param trackByUsesComponentInstance Whether the tracking function has any references to the
 *  component instance. If it doesn't, we can avoid rebinding it.
 * @param emptyTemplateFn Reference to the template function of the empty block.
 * @param emptyDecls The number of nodes, local refs, and pipes for the empty block.
 * @param emptyVars The number of bindings for the empty block.
 * @param emptyTagName The name of the empty block container element, if applicable
 * @param emptyAttrsIndex Index of the empty block template attributes in the `consts` array.
 *
 * @codeGenApi
 */
export declare function ɵɵrepeaterCreate(index: number, templateFn: ComponentTemplate<unknown>, decls: number, vars: number, tagName: string | null, attrsIndex: number | null, trackByFn: TrackByFunction<unknown>, trackByUsesComponentInstance?: boolean, emptyTemplateFn?: ComponentTemplate<unknown>, emptyDecls?: number, emptyVars?: number, emptyTagName?: string | null, emptyAttrsIndex?: number | null): void;

/**
 * A built-in trackBy function used for situations where users specified collection item reference
 * as a tracking expression. Having this function body in the runtime avoids unnecessary code
 * generation.
 *
 * @param index
 * @returns
 */
export declare function ɵɵrepeaterTrackByIdentity<T>(_: number, value: T): T;

/**
 * A built-in trackBy function used for situations where users specified collection index as a
 * tracking expression. Having this function body in the runtime avoids unnecessary code generation.
 *
 * @param index
 * @returns
 */
export declare function ɵɵrepeaterTrackByIndex(index: number): number;

/**
 * Replaces the metadata of a component type and re-renders all live instances of the component.
 * @param type Class whose metadata will be replaced.
 * @param applyMetadata Callback that will apply a new set of metadata on the `type` when invoked.
 * @param environment Syntehtic namespace imports that need to be passed along to the callback.
 * @param locals Local symbols from the source location that have to be exposed to the callback.
 * @codeGenApi
 */
export declare function ɵɵreplaceMetadata(type: Type<unknown>, applyMetadata: (...args: [Type<unknown>, unknown[], ...unknown[]]) => void, namespaces: unknown[], locals: unknown[]): void;

/**
 * Clears the view set in `ɵɵrestoreView` from memory. Returns the passed in
 * value so that it can be used as a return value of an instruction.
 *
 * @codeGenApi
 */
export declare function ɵɵresetView<T>(value?: T): T | undefined;

/**
 *
 * @codeGenApi
 */
export declare function ɵɵresolveBody(element: RElement & {
    ownerDocument: Document;
}): HTMLElement;

/**
 *
 * @codeGenApi
 */
export declare function ɵɵresolveDocument(element: RElement & {
    ownerDocument: Document;
}): Document;

/**
 *
 * @codeGenApi
 */
export declare function ɵɵresolveWindow(element: RElement & {
    ownerDocument: Document;
}): (Window & typeof globalThis) | null;

/**
 * Restores `contextViewData` to the given OpaqueViewState instance.
 *
 * Used in conjunction with the getCurrentView() instruction to save a snapshot
 * of the current view and restore it when listeners are invoked. This allows
 * walking the declaration view tree in listeners to get vars from parent views.
 *
 * @param viewToRestore The OpaqueViewState instance to restore.
 * @returns Context of the restored OpaqueViewState instance.
 *
 * @codeGenApi
 */
export declare function ɵɵrestoreView<T = any>(viewToRestore: OpaqueViewState): T;

/**
 * An `html` sanitizer which converts untrusted `html` **string** into trusted string by removing
 * dangerous content.
 *
 * This method parses the `html` and locates potentially dangerous content (such as urls and
 * javascript) and removes it.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustHtml}.
 *
 * @param unsafeHtml untrusted `html`, typically from the user.
 * @returns `html` string which is safe to display to user, because all of the dangerous javascript
 * and urls have been removed.
 *
 * @codeGenApi
 */
export declare function ɵɵsanitizeHtml(unsafeHtml: any): TrustedHTML | string;

/**
 * A `url` sanitizer which only lets trusted `url`s through.
 *
 * This passes only `url`s marked trusted by calling {@link bypassSanitizationTrustResourceUrl}.
 *
 * @param unsafeResourceUrl untrusted `url`, typically from the user.
 * @returns `url` string which is safe to bind to the `src` properties such as `<img src>`, because
 * only trusted `url`s have been allowed to pass.
 *
 * @codeGenApi
 */
export declare function ɵɵsanitizeResourceUrl(unsafeResourceUrl: any): TrustedScriptURL | string;

/**
 * A `script` sanitizer which only lets trusted javascript through.
 *
 * This passes only `script`s marked trusted by calling {@link
 * bypassSanitizationTrustScript}.
 *
 * @param unsafeScript untrusted `script`, typically from the user.
 * @returns `url` string which is safe to bind to the `<script>` element such as `<img src>`,
 * because only trusted `scripts` have been allowed to pass.
 *
 * @codeGenApi
 */
export declare function ɵɵsanitizeScript(unsafeScript: any): TrustedScript | string;

/**
 * A `style` sanitizer which converts untrusted `style` **string** into trusted string by removing
 * dangerous content.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustStyle}.
 *
 * @param unsafeStyle untrusted `style`, typically from the user.
 * @returns `style` string which is safe to bind to the `style` properties.
 *
 * @codeGenApi
 */
export declare function ɵɵsanitizeStyle(unsafeStyle: any): string;

/**
 * A `url` sanitizer which converts untrusted `url` **string** into trusted string by removing
 * dangerous
 * content.
 *
 * This method parses the `url` and locates potentially dangerous content (such as javascript) and
 * removes it.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustUrl}.
 *
 * @param unsafeUrl untrusted `url`, typically from the user.
 * @returns `url` string which is safe to bind to the `src` properties such as `<img src>`, because
 * all of the dangerous javascript has been removed.
 *
 * @codeGenApi
 */
export declare function ɵɵsanitizeUrl(unsafeUrl: any): string;

/**
 * Sanitizes URL, selecting sanitizer function based on tag and property names.
 *
 * This function is used in case we can't define security context at compile time, when only prop
 * name is available. This happens when we generate host bindings for Directives/Components. The
 * host element is unknown at compile time, so we defer calculation of specific sanitizer to
 * runtime.
 *
 * @param unsafeUrl untrusted `url`, typically from the user.
 * @param tag target element tag name.
 * @param prop name of the property that contains the value.
 * @returns `url` string which is safe to bind.
 *
 * @codeGenApi
 */
export declare function ɵɵsanitizeUrlOrResourceUrl(unsafeUrl: any, tag: string, prop: string): any;

/**
 * Generated next to NgModules to monkey-patch directive and pipe references onto a component's
 * definition, when generating a direct reference in the component file would otherwise create an
 * import cycle.
 *
 * See [this explanation](https://hackmd.io/Odw80D0pR6yfsOjg_7XCJg?view) for more details.
 *
 * @codeGenApi
 */
export declare function ɵɵsetComponentScope(type: ɵComponentType<any>, directives: Type<any>[] | (() => Type<any>[]), pipes: Type<any>[] | (() => Type<any>[])): void;

/**
 * Adds the module metadata that is necessary to compute the module's transitive scope to an
 * existing module definition.
 *
 * Scope metadata of modules is not used in production builds, so calls to this function can be
 * marked pure to tree-shake it from the bundle, allowing for all referenced declarations
 * to become eligible for tree-shaking as well.
 *
 * @codeGenApi
 */
export declare function ɵɵsetNgModuleScope(type: any, scope: NgModuleScopeInfoFromDecorator): unknown;

/**
 * Instruction that stores the value of a `@let` declaration on the current view.
 * Returns the value to allow usage inside variable initializers.
 *
 * @codeGenApi
 */
export declare function ɵɵstoreLet<T>(value: T): T;

/**
 * Update style bindings using an object literal on an element.
 *
 * This instruction is meant to apply styling via the `[style]="exp"` template bindings.
 * When styles are applied to the element they will then be updated with respect to
 * any styles/classes set via `styleProp`. If any styles are set to falsy
 * then they will be removed from the element.
 *
 * Note that the styling instruction will not be applied until `stylingApply` is called.
 *
 * @param styles A key/value style map of the styles that will be applied to the given element.
 *        Any missing styles (that have already been applied to the element beforehand) will be
 *        removed (unset) from the element's styling.
 *
 * Note that this will apply the provided styleMap value to the host element if this function
 * is called within a host binding.
 *
 * @codeGenApi
 */
export declare function ɵɵstyleMap(styles: {
    [styleName: string]: any;
} | string | undefined | null): void;


/**
 *
 * Update an interpolated style on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div style="key: {{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolate1('key: ', v0, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolate1(prefix: string, v0: any, suffix: string): void;

/**
 *
 * Update an interpolated style on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div style="key: {{v0}}; key1: {{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolate2('key: ', v0, '; key1: ', v1, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolate2(prefix: string, v0: any, i0: string, v1: any, suffix: string): void;

/**
 *
 * Update an interpolated style on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div style="key: {{v0}}; key2: {{v1}}; key2: {{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolate3(
 *     'key: ', v0, '; key1: ', v1, '; key2: ', v2, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolate3(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string): void;

/**
 *
 * Update an interpolated style on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div style="key: {{v0}}; key1: {{v1}}; key2: {{v2}}; key3: {{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolate4(
 *     'key: ', v0, '; key1: ', v1, '; key2: ', v2, '; key3: ', v3, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolate4(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string): void;

/**
 *
 * Update an interpolated style on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div style="key: {{v0}}; key1: {{v1}}; key2: {{v2}}; key3: {{v3}}; key4: {{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolate5(
 *     'key: ', v0, '; key1: ', v1, '; key2: ', v2, '; key3: ', v3, '; key4: ', v4, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolate5(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string): void;

/**
 *
 * Update an interpolated style on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div style="key: {{v0}}; key1: {{v1}}; key2: {{v2}}; key3: {{v3}}; key4: {{v4}};
 *             key5: {{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolate6(
 *    'key: ', v0, '; key1: ', v1, '; key2: ', v2, '; key3: ', v3, '; key4: ', v4, '; key5: ', v5,
 *    'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolate6(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string): void;

/**
 *
 * Update an interpolated style on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div style="key: {{v0}}; key1: {{v1}}; key2: {{v2}}; key3: {{v3}}; key4: {{v4}}; key5: {{v5}};
 *             key6: {{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolate7(
 *    'key: ', v0, '; key1: ', v1, '; key2: ', v2, '; key3: ', v3, '; key4: ', v4, '; key5: ', v5,
 *    '; key6: ', v6, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolate7(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string): void;

/**
 *
 * Update an interpolated style on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div style="key: {{v0}}; key1: {{v1}}; key2: {{v2}}; key3: {{v3}}; key4: {{v4}}; key5: {{v5}};
 *             key6: {{v6}}; key7: {{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolate8(
 *    'key: ', v0, '; key1: ', v1, '; key2: ', v2, '; key3: ', v3, '; key4: ', v4, '; key5: ', v5,
 *    '; key6: ', v6, '; key7: ', v7, 'suffix');
 * ```
 *
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param i6 Static value used for concatenation only.
 * @param v7 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolate8(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string): void;

/**
 * Update an interpolated style on an element with 9 or more bound values surrounded by text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div
 *  class="key: {{v0}}; key1: {{v1}}; key2: {{v2}}; key3: {{v3}}; key4: {{v4}}; key5: {{v5}};
 *         key6: {{v6}}; key7: {{v7}}; key8: {{v8}}; key9: {{v9}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstyleMapInterpolateV(
 *    ['key: ', v0, '; key1: ', v1, '; key2: ', v2, '; key3: ', v3, '; key4: ', v4, '; key5: ', v5,
 *     '; key6: ', v6, '; key7: ', v7, '; key8: ', v8, '; key9: ', v9, 'suffix']);
 * ```
 *.
 * @param values The collection of values and the strings in-between those values, beginning with
 * a string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '; key2: ', value1, '; key2: ', value2, ..., value99, 'suffix']`)
 * @codeGenApi
 */
export declare function ɵɵstyleMapInterpolateV(values: any[]): void;

/**
 * Update a style binding on an element with the provided value.
 *
 * If the style value is falsy then it will be removed from the element
 * (or assigned a different value depending if there are any styles placed
 * on the element with `styleMap` or any static styles that are
 * present from when the element was created with `styling`).
 *
 * Note that the styling element is updated as part of `stylingApply`.
 *
 * @param prop A valid CSS property.
 * @param value New value to write (`null` or an empty string to remove).
 * @param suffix Optional suffix. Used with scalar values to add unit such as `px`.
 *
 * Note that this will apply the provided style value to the host element if this function is called
 * within a host binding function.
 *
 * @codeGenApi
 */
export declare function ɵɵstyleProp(prop: string, value: string | number | ɵSafeValue | undefined | null, suffix?: string | null): typeof ɵɵstyleProp;


/**
 *
 * Update an interpolated style property on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div style.color="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolate1(0, 'prefix', v0, 'suffix');
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`.
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolate1(prop: string, prefix: string, v0: any, suffix: string, valueSuffix?: string | null): typeof ɵɵstylePropInterpolate1;

/**
 *
 * Update an interpolated style property on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div style.color="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolate2(0, 'prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`.
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolate2(prop: string, prefix: string, v0: any, i0: string, v1: any, suffix: string, valueSuffix?: string | null): typeof ɵɵstylePropInterpolate2;

/**
 *
 * Update an interpolated style property on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div style.color="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolate3(0, 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`.
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolate3(prop: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string, valueSuffix?: string | null): typeof ɵɵstylePropInterpolate3;

/**
 *
 * Update an interpolated style property on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div style.color="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolate4(0, 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`.
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolate4(prop: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string, valueSuffix?: string | null): typeof ɵɵstylePropInterpolate4;

/**
 *
 * Update an interpolated style property on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div style.color="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolate5(0, 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`.
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolate5(prop: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string, valueSuffix?: string | null): typeof ɵɵstylePropInterpolate5;

/**
 *
 * Update an interpolated style property on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div style.color="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolate6(0, 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`.
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolate6(prop: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string, valueSuffix?: string | null): typeof ɵɵstylePropInterpolate6;

/**
 *
 * Update an interpolated style property on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div style.color="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolate7(
 *    0, 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`.
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolate7(prop: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string, valueSuffix?: string | null): typeof ɵɵstylePropInterpolate7;

/**
 *
 * Update an interpolated style property on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div style.color="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolate8(0, 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6,
 * '-', v7, 'suffix');
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`.
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param i6 Static value used for concatenation only.
 * @param v7 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolate8(prop: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string, valueSuffix?: string | null): typeof ɵɵstylePropInterpolate8;

/**
 * Update an interpolated style property on an element with 9 or more bound values surrounded by
 * text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div
 *  style.color="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix">
 * </div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵstylePropInterpolateV(
 *  0, ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `styling`..
 * @param values The collection of values and the strings in-between those values, beginning with
 * a string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @param valueSuffix Optional suffix. Used with scalar values to add unit such as `px`.
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵstylePropInterpolateV(prop: string, values: any[], valueSuffix?: string | null): typeof ɵɵstylePropInterpolateV;

/**
 * Registers a synthetic host listener (e.g. `(@foo.start)`) on a component or directive.
 *
 * This instruction is for compatibility purposes and is designed to ensure that a
 * synthetic host listener (e.g. `@HostListener('@foo.start')`) properly gets rendered
 * in the component's renderer. Normally all host listeners are evaluated with the
 * parent component's renderer, but, in the case of animation @triggers, they need
 * to be evaluated with the sub component's renderer (because that's where the
 * animation triggers are defined).
 *
 * Do not use this instruction as a replacement for `listener`. This instruction
 * only exists to ensure compatibility with the ViewEngine's host binding behavior.
 *
 * @param eventName Name of the event
 * @param listenerFn The function to be called when event emits
 * @param useCapture Whether or not to use capture in event listener
 * @param eventTargetResolver Function that returns global target information in case this listener
 * should be attached to a global object like window, document or body
 *
 * @codeGenApi
 */
export declare function ɵɵsyntheticHostListener(eventName: string, listenerFn: (e?: any) => any): typeof ɵɵsyntheticHostListener;

/**
 * Updates a synthetic host binding (e.g. `[@foo]`) on a component or directive.
 *
 * This instruction is for compatibility purposes and is designed to ensure that a
 * synthetic host binding (e.g. `@HostBinding('@foo')`) properly gets rendered in
 * the component's renderer. Normally all host bindings are evaluated with the parent
 * component's renderer, but, in the case of animation @triggers, they need to be
 * evaluated with the sub component's renderer (because that's where the animation
 * triggers are defined).
 *
 * Do not use this instruction as a replacement for `elementProperty`. This instruction
 * only exists to ensure compatibility with the ViewEngine's host binding behavior.
 *
 * @param index The index of the element to update in the data array
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 *
 * @codeGenApi
 */
export declare function ɵɵsyntheticHostProperty<T>(propName: string, value: T | ɵNO_CHANGE, sanitizer?: SanitizerFn | null): typeof ɵɵsyntheticHostProperty;

/**
 * Creates an LContainer for an ng-template (dynamically-inserted view), e.g.
 *
 * <ng-template #foo>
 *    <div></div>
 * </ng-template>
 *
 * @param index The index of the container in the data array
 * @param templateFn Inline template
 * @param decls The number of nodes, local refs, and pipes for this template
 * @param vars The number of bindings for this template
 * @param tagName The name of the container element, if applicable
 * @param attrsIndex Index of template attributes in the `consts` array.
 * @param localRefs Index of the local references in the `consts` array.
 * @param localRefExtractor A function which extracts local-refs values from the template.
 *        Defaults to the current element associated with the local-ref.
 *
 * @codeGenApi
 */
export declare function ɵɵtemplate(index: number, templateFn: ComponentTemplate<any> | null, decls: number, vars: number, tagName?: string | null, attrsIndex?: number | null, localRefsIndex?: number | null, localRefExtractor?: LocalRefExtractor): typeof ɵɵtemplate;

/**
 * Retrieves `TemplateRef` instance from `Injector` when a local reference is placed on the
 * `<ng-template>` element.
 *
 * @codeGenApi
 */
export declare function ɵɵtemplateRefExtractor(tNode: TNode, lView: LView): TemplateRef<any> | null;

/**
 * Create static text node
 *
 * @param index Index of the node in the data array
 * @param value Static string value to write.
 *
 * @codeGenApi
 */
export declare function ɵɵtext(index: number, value?: string): void;

/**
 *
 * Update text content with a lone bound value
 *
 * Used when a text node has 1 interpolated value in it, an no additional text
 * surrounds that interpolated value:
 *
 * ```html
 * <div>{{v0}}</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate(v0);
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate(v0: any): typeof ɵɵtextInterpolate;

/**
 *
 * Update text content with single bound value surrounded by other text.
 *
 * Used when a text node has 1 interpolated value in it:
 *
 * ```html
 * <div>prefix{{v0}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate1('prefix', v0, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate1(prefix: string, v0: any, suffix: string): typeof ɵɵtextInterpolate1;

/**
 *
 * Update text content with 2 bound values surrounded by other text.
 *
 * Used when a text node has 2 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate2('prefix', v0, '-', v1, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate2(prefix: string, v0: any, i0: string, v1: any, suffix: string): typeof ɵɵtextInterpolate2;

/**
 *
 * Update text content with 3 bound values surrounded by other text.
 *
 * Used when a text node has 3 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate3(
 * 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate3(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string): typeof ɵɵtextInterpolate3;

/**
 *
 * Update text content with 4 bound values surrounded by other text.
 *
 * Used when a text node has 4 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate4(
 * 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see ɵɵtextInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate4(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string): typeof ɵɵtextInterpolate4;

/**
 *
 * Update text content with 5 bound values surrounded by other text.
 *
 * Used when a text node has 5 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate5(
 * 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate5(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string): typeof ɵɵtextInterpolate5;

/**
 *
 * Update text content with 6 bound values surrounded by other text.
 *
 * Used when a text node has 6 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate6(
 *    'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change. @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate6(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string): typeof ɵɵtextInterpolate6;

/**
 *
 * Update text content with 7 bound values surrounded by other text.
 *
 * Used when a text node has 7 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate7(
 *    'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate7(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string): typeof ɵɵtextInterpolate7;

/**
 *
 * Update text content with 8 bound values surrounded by other text.
 *
 * Used when a text node has 8 interpolated values in it:
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolate8(
 *  'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 * @returns itself, so that it may be chained.
 * @see textInterpolateV
 * @codeGenApi
 */
export declare function ɵɵtextInterpolate8(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string): typeof ɵɵtextInterpolate8;

/**
 * Update text content with 9 or more bound values other surrounded by text.
 *
 * Used when the number of interpolated values exceeds 8.
 *
 * ```html
 * <div>prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix</div>
 * ```
 *
 * Its compiled representation is:
 *
 * ```ts
 * ɵɵtextInterpolateV(
 *  ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *.
 * @param values The collection of values and the strings in between those values, beginning with
 * a string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 *
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ɵɵtextInterpolateV(values: any[]): typeof ɵɵtextInterpolateV;

/**
 * A template tag function for promoting the associated constant literal to a
 * TrustedHTML. Interpolation is explicitly not allowed.
 *
 * @param html constant template literal containing trusted HTML.
 * @returns TrustedHTML wrapping `html`.
 *
 * @security This is a security-sensitive function and should only be used to
 * convert constant values of attributes and properties found in
 * application-provided Angular templates to TrustedHTML.
 *
 * @codeGenApi
 */
export declare function ɵɵtrustConstantHtml(html: TemplateStringsArray): TrustedHTML | string;

/**
 * A template tag function for promoting the associated constant literal to a
 * TrustedScriptURL. Interpolation is explicitly not allowed.
 *
 * @param url constant template literal containing a trusted script URL.
 * @returns TrustedScriptURL wrapping `url`.
 *
 * @security This is a security-sensitive function and should only be used to
 * convert constant values of attributes and properties found in
 * application-provided Angular templates to TrustedScriptURL.
 *
 * @codeGenApi
 */
export declare function ɵɵtrustConstantResourceUrl(url: TemplateStringsArray): TrustedScriptURL | string;

/**
 * Function used inside two-way listeners to conditionally set the value of the bound expression.
 *
 * @param target Field on which to set the value.
 * @param value Value to be set to the field.
 *
 * @codeGenApi
 */
export declare function ɵɵtwoWayBindingSet<T>(target: unknown, value: T): boolean;

/**
 * Adds an event listener that updates a two-way binding to the current node.
 *
 * @param eventName Name of the event.
 * @param listenerFn The function to be called when event emits.
 *
 * @codeGenApi
 */
export declare function ɵɵtwoWayListener(eventName: string, listenerFn: (e?: any) => any): typeof ɵɵtwoWayListener;

/**
 * Update a two-way bound property on a selected element.
 *
 * Operates on the element selected by index via the {@link select} instruction.
 *
 * @param propName Name of property.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @returns This function returns itself so that it may be chained
 * (e.g. `twoWayProperty('name', ctx.name)('title', ctx.title)`)
 *
 * @codeGenApi
 */
export declare function ɵɵtwoWayProperty<T>(propName: string, value: T | WritableSignal<T>, sanitizer?: SanitizerFn | null): typeof ɵɵtwoWayProperty;


/**
 * Validation function invoked at runtime for each binding that might potentially
 * represent a security-sensitive attribute of an <iframe>.
 * See `IFRAME_SECURITY_SENSITIVE_ATTRS` in the
 * `packages/compiler/src/schema/dom_security_schema.ts` script for the full list
 * of such attributes.
 *
 * @codeGenApi
 */
export declare function ɵɵvalidateIframeAttribute(attrValue: any, tagName: string, attrName: string): any;

/**
 * Creates a new view query by initializing internal data structures.
 *
 * @param predicate The type for which the query will search
 * @param flags Flags associated with the query
 * @param read What to save in the query
 *
 * @codeGenApi
 */
export declare function ɵɵviewQuery<T>(predicate: ProviderToken<unknown> | string | string[], flags: QueryFlags, read?: any): void;

/**
 * Creates a new view query by initializing internal data structures and binding a new query to the
 * target signal.
 *
 * @param target The target signal to assign the query results to.
 * @param predicate The type or label that should match a given query
 * @param flags Flags associated with the query
 * @param read What to save in the query
 *
 * @codeGenApi
 */
export declare function ɵɵviewQuerySignal(target: Signal<unknown>, predicate: ProviderToken<unknown> | string[], flags: QueryFlags, read?: ProviderToken<unknown>): void;

export { }
