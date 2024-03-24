import { useEffect, useRef } from 'react';
import { JSONEditor } from 'vanilla-jsoneditor';

export default function SvelteJSONEditor(props: any) {
  const refContainer = useRef(null);
  const refEditor = useRef(null);

  useEffect(() => {
    // create editor
    // @ts-ignore
    refEditor.current = new JSONEditor({
      target: refContainer.current!,
      props: {},
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        // @ts-ignore
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      // @ts-ignore
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className="vanilla-jsoneditor-react" ref={refContainer}></div>;
}
