import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

module {
  module MinimalTask {
    public type TaskStatusInternal = {
      #REQUESTED;
      #IN_PROGRESS;
      #QA_ASISTENMU;
      #REVISION;
      #DONE;
    };

    public type TaskRecord = {
      taskId : Text;
      clientId : Text;
      createdByPrincipal : Principal;
      title : Text;
      description : Text;
      clientDeadline : ?Nat;
      internalDeadline : ?Nat;
      assignedPartnerId : ?Text;
      assignedAsistenmuName : Text;
      statusInternal : TaskStatusInternal;
      createdAt : Nat;
      updatedAt : Nat;
    };
  };

  type OldActor = {
    tasksById : Map.Map<Text, MinimalTask.TaskRecord>;
  };

  module NewMinimalTask {
    public type TaskStatusInternal = {
      #REQUESTED;
      #IN_PROGRESS;
      #QA_ASISTENMU;
      #REVISION;
      #DONE;
    };

    public type RequestType = {
      #NORMAL;
      #PRIORITY;
      #URGENT;
    };

    public type TaskRecord = {
      taskId : Text;
      clientId : Text;
      createdByPrincipal : Principal.Principal;
      title : Text;
      description : Text;
      clientDeadline : ?Nat;
      internalDeadline : ?Nat;
      assignedPartnerId : ?Text;
      assignedAsistenmuName : Text;
      statusInternal : TaskStatusInternal;
      createdAt : Nat;
      updatedAt : Nat;
      requestType : RequestType;
    };
  };

  type NewActor = {
    tasksById : Map.Map<Text, NewMinimalTask.TaskRecord>;
  };

  public func run(old : OldActor) : NewActor {
    let newTasksById = old.tasksById.map<Text, MinimalTask.TaskRecord, NewMinimalTask.TaskRecord>(
      func(_taskId, oldTask) {
        {
          oldTask with
          requestType = #NORMAL;
        };
      }
    );
    { tasksById = newTasksById };
  };
};
