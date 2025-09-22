from functools import partial

from fastapi import Depends

from service.auth import AuthController

from module import UserRepository, PeopleRepository, EquipmentRepository, SensorRepository, UserController, User
from module.people import  People, PeopleController, PeopleService
from module.equipment import Equipment, EquipmentService, EquipmentController
from module.sensor import Sensor, SensorService, SensorController
from service.campaign_management.campaign_service import CampaignService
from service.campaign_management.controller_campaign import CampaignController
from core.database import get_session


from module.project import Project, ProjectService, ProjectController, ProjectRepository
from module.tests import Test, TestController, TestService, TestRepository


class Factory:
    """
    This is the factory container that will instantiate all the controllers and
    repositories which can be accessed by the rest of the application.
    """

    # Repositories
    # task_repository = partial(TaskRepository, Task)
    # user_repository = partial(UserRepository, User)
    user_repository = partial(UserRepository, User)
    people_repository = partial(PeopleRepository, People)
    equipment_repository = partial(EquipmentRepository, Equipment)
    sensor_repository = partial(SensorRepository, Sensor)
    project_repository = partial(ProjectRepository, Project)
    test_repository = partial(TestRepository, Test)

    def get_user_controller(self, db_session=Depends(get_session)):
        return UserController(
            user_repository=self.user_repository(db_session=db_session)
        )

    def get_people_controller(self, db_session=Depends(get_session)):
        return PeopleController(
            people_repository=self.people_repository(db_session=db_session),
            people_service=PeopleService(people_repository=self.people_repository(db_session=db_session))
        )

    def get_equipment_controller(self, db_session=Depends(get_session)):
        return EquipmentController(
            equipment_repository=self.equipment_repository(db_session=db_session),
            equipment_service=EquipmentService(equipment_repository=self.equipment_repository(db_session=db_session))
        )

    def get_sensor_controller(self, db_session=Depends(get_session)):
        return SensorController(
            sensor_repository=self.sensor_repository(db_session=db_session),
            sensor_service=SensorService(sensor_repository=self.sensor_repository(db_session=db_session))
        )
    def get_project_controller(self, db_session=Depends(get_session)):
        return ProjectController(
            project_repository=self.project_repository(db_session=db_session),
            project_service=ProjectService(
                project_repository=self.project_repository(db_session=db_session)
            ),
        )

    def get_test_controller(self, db_session=Depends(get_session)):
        return TestController(
            test_repository=self.test_repository(db_session=db_session),
            test_service=TestService(
                test_repository=self.test_repository(db_session=db_session)
            ),
        )

    # def get_task_controller(self, db_session=Depends(get_session)):
    #     return TaskController(
    #         task_repository=self.task_repository(db_session=db_session)
    #     )

    def get_auth_controller(self, db_session=Depends(get_session)):
        return AuthController(
            user_repository=self.user_repository(db_session=db_session),
        )
    def get_campaign_controller(self, db_session=Depends(get_session)):
        people_service = PeopleService(people_repository=self.people_repository(db_session=db_session))
        equipment_service = EquipmentService(equipment_repository=self.equipment_repository(db_session=db_session))
        sensor_service = SensorService(sensor_repository=self.sensor_repository(db_session=db_session))

        campaign_service = CampaignService(
            people_service=people_service,
            equipment_service=equipment_service,
            sensor_service=sensor_service
        )
        return CampaignController(
            campaign_service=campaign_service,
            people_service=people_service,
            equipment_service=equipment_service,
            sensor_service=sensor_service
        )
