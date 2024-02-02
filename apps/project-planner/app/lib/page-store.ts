import { atom, PrimitiveAtom, useAtom } from "jotai";
import React from "react";

type _InternalState = {
  loading: boolean;
  error: any;
  prevState: any | null;
};

const internalStateAtom = atom<_InternalState>({
  loading: false,
  error: null,
  prevState: null,
});

export const usePageStore = <
  StateType extends Record<string, any>,
  Key extends string,
  Props
>({
  stateAtom,
  actions,
}: {
  stateAtom: PrimitiveAtom<StateType>;
  actions: Record<Key, (props: Props) => Promise<any>>;
}) => {
  const [atomState, set] = useAtom(stateAtom);
  const [internal, setInternal] = useAtom(internalStateAtom);

  const propsRef = React.useRef<Props | null>(null);
  const actionKeyRef = React.useRef<Key | null>(null);

  const execute = (
    key: Key,
    props: Props,
    cb: (state: StateType) => StateType
  ) => {
    console.log("EXECUTE");
    setInternal({
      ...internal,
      loading: true,
      error: null,
      prevState: atomState,
    });

    set({
      ...cb(atomState),
    });

    propsRef.current = props;
    actionKeyRef.current = key;
  };

  React.useEffect(() => {
    console.log("EFFECT:", internal.loading, propsRef.current);

    if (propsRef.current && internal.loading) {
      console.log("RUNM");
      const action = actions[actionKeyRef.current!!];

      const run = async () => {
        const res = await action(propsRef.current!!);

        propsRef.current = null;

        console.log("END!!!!");
        if (res.error) {
          setInternal({
            ...internal,
            error: res.error,
            loading: false,
          });

          set({
            ...internal.prevState,
          });
        } else {
          setInternal({
            ...internal,
            loading: false,
            prevState: null,
          });
        }
      };
      run();
    }
  }, [internal.loading]);

  return {
    atomState,
    execute,
    isLoading: internal.loading,
    error: internal.error,
  };
};
