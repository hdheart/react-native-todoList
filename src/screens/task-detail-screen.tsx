import * as React from 'react'
import TaskItemDetail from '../components/task/task-item-detail'
const TaskDetailScreen = ({navigation, route}: any) => {
    return (<TaskItemDetail
        navigation={navigation}
        route={route}
    />)
}

export default TaskDetailScreen