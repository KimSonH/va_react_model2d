export class UrlApi {
  public static readonly GET_REFRESH = '/admin/authentication/refresh'

  public static readonly POST_LOGIN = '/admin/authentication/login'

  public static readonly POST_LOGOUT = '/admin/authentication/logout'

  public static readonly USER = '/users'

  public static readonly UPLOAD_AVATAR = '/uploads/avatar'

  public static readonly CREATE_MANY_USER = '/users/create-many'

  public static readonly UPDATE_MANY_USER = '/users/update-many'

  public static readonly DELETE_MANY_USER = '/users/delete-many'

  public static readonly GET_MANY_USER = '/users/get-many'

  public static readonly ACTIVE_ALL_USER = '/users/action-add-all'

  public static readonly ACTIVE_USER = '/users/action-add-faces'

  public static readonly INACTIVE_ALL_USER = '/users/action-delete-all'

  public static readonly INACTIVE_USER = '/users/action-delete-faces'

  public static readonly UPDATE_PROFILE = '/admin/authentication/profile'

  public static readonly ATTENDANCE_TIME = '/attendance/time'

  public static readonly ATTENDANCE = '/attendance'

  public static readonly REG_CONTROL = '/admin/authentication/face-reg-control'

  public static readonly HOME_CHART = '/home/chart'

  public static readonly GET_MESSAGE = '/chats/messages'
}
