import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import TaskItem from '../src/components/TaskItem';
import useTasks from '../src/hooks/useTasks';
import Logo from '../src/components/Logo';

import { defaultPriority } from '../src/config';

interface IndexProps {
  title: string;
}

const index: React.FC<IndexProps> = ({ title }) => {
  const [state, dispatch] = useTasks();
  const [creating, setCreating] = useState<boolean>(false);

  const onCreate = (): void => {
    setCreating(true);
  };

  const onCancelNew = (): void => {
    setCreating(false);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <header>
          <div className="wrapper">
            <div className="logoWrapper">
              <Logo />
            </div>
            <div>
              <button
                type="button"
                className="yellow"
                title="Create Task"
                onClick={onCreate}
                disabled={creating}
              >
                Create
              </button>
            </div>
          </div>
        </header>
        <section>
          {state.tasks.length && (
            <ul>
              {creating && (
              <TaskItem
                key="new"
                taskId="new"
                title=""
                taskIndex={0}
                priority={defaultPriority}
                onCancelNew={onCancelNew}
                dispatch={dispatch}
              />
              )}
              {state.tasks.map(
                    ({ id, title: taskTitle, priority, completed }, taskIndex) => (
                      <TaskItem
                        key={id}
                        taskId={id}
                        title={taskTitle}
                        priority={priority}
                        taskIndex={taskIndex + (creating ? 1 : 0)}
                        dispatch={dispatch}
                        completed={completed}
                      />
                    ),
                  )}
            </ul>
        )}
        </section>
      </main>
    </>
  );
};

/**
 * This is getServerSideProps to verify that the ENV is working,
 * nota that this functionality (because of the static nature of the data)
 * will fit better in the getStaticProps paradigm
 */
export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  return {
    props: {
      title: `Binpar | Super TODO List`,
    },
  };
};

export default index;
