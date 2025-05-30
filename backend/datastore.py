class DataStore:
    users = {}  # username: User instance
    tasks = {}  # task_id: Task instance
    task_counter = 1

    @classmethod
    def add_user(cls, user):
        cls.users[user.username] = user

    @classmethod
    def get_user(cls, username):
        return cls.users.get(username)

    @classmethod
    def add_task(cls, task):
        task.id = cls.task_counter
        cls.tasks[cls.task_counter] = task
        cls.task_counter += 1

    @classmethod
    def get_tasks_by_user(cls, username):
        return [task for task in cls.tasks.values() if task.user_id == username]

    @classmethod
    def get_task_by_id(cls, task_id):
        return cls.tasks.get(task_id)

    @classmethod
    def delete_task(cls, task_id):
        if task_id in cls.tasks:
            del cls.tasks[task_id]

    @classmethod
    def update_task(cls, updated_task):
        if updated_task.id in cls.tasks:
            cls.tasks[updated_task.id] = updated_task
