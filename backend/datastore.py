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